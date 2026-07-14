"use client";
import { v4 as uuidv4 } from "uuid";
import type { CAPIEventPayload } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? "";

// ─── User data (plain — web pixels hash/normalize on platform side) ─────────

export interface PixelUserData {
  name?: string;
  phone?: string;
}

/** Meta CAPI format: 96565432198 (country code, no +, no leading 0) */
export function normalizePhoneMeta(phone: string): string {
  let cleaned = phone.replace(/[\s\-+()]/g, "");
  if (cleaned.startsWith("965")) cleaned = cleaned.slice(3);
  if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);
  return `965${cleaned}`;
}

/** TikTok / Snap E.164: +96565432198 */
export function normalizePhoneE164(phone: string): string {
  return `+${normalizePhoneMeta(phone)}`;
}

function splitName(name: string): { fn: string; ln: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return { fn: parts[0]?.toLowerCase() ?? "", ln: parts.slice(1).join(" ").toLowerCase() };
}

// ─── Cookie helpers (pass to CAPI for matching — never hash these) ───────────

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function getFbp(): string {
  return getCookie("_fbp");
}

function getFbc(): string {
  const fromCookie = getCookie("_fbc");
  if (fromCookie) return fromCookie;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (!fbclid) return "";
  return `fb.1.${Date.now()}.${fbclid}`;
}

function getTtp(): string {
  return getCookie("_ttp");
}

function getScid(): string {
  return getCookie("_scid");
}

// ─── Session event IDs (one per event type per session) ────────────────────

function getOrCreateEventId(key: string): string {
  if (typeof window === "undefined") return uuidv4();
  const stored = sessionStorage.getItem(key);
  if (stored) return stored;
  const id = uuidv4();
  sessionStorage.setItem(key, id);
  return id;
}

export function getViewEventId(sku: string) {
  return getOrCreateEventId(`rk_view_${sku}`);
}
export function getATCEventId(sku: string) {
  return getOrCreateEventId(`rk_atc_${sku}`);
}
export function getICEventId() {
  return getOrCreateEventId("rk_ic");
}
export function getLeadEventId() {
  return getOrCreateEventId("rk_lead");
}
export function generatePurchaseEventId() {
  const id = uuidv4();
  if (typeof window !== "undefined") sessionStorage.setItem("rk_purchase", id);
  return id;
}
export function getStoredPurchaseEventId() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("rk_purchase") ?? "";
}

// ─── Declare globals ─────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (...args: unknown[]) => void;
      identify: (data: Record<string, string>) => void;
      page: () => void;
    };
    snaptr?: (...args: unknown[]) => void;
  }
}

// ─── Web pixel helpers ───────────────────────────────────────────────────────

function setMetaUserData(user?: PixelUserData) {
  if (!user?.phone || typeof window === "undefined" || !window.fbq) return;
  const { fn, ln } = splitName(user.name ?? "");
  // Plain text — Meta Pixel hashes/normalizes client-side (Automatic Advanced Matching)
  window.fbq("set", "userData", {
    ph: normalizePhoneMeta(user.phone),
    ...(fn && { fn }),
    ...(ln && { ln }),
    country: "kw",
  });
}

function setTikTokUser(user?: PixelUserData) {
  if (!user?.phone || typeof window === "undefined" || !window.ttq) return;
  window.ttq.identify({ phone_number: normalizePhoneE164(user.phone) });
}

function fbTrack(
  event: string,
  params: Record<string, unknown>,
  eventId: string,
  user?: PixelUserData
) {
  if (typeof window === "undefined" || !FB_PIXEL_ID) return;
  setMetaUserData(user);
  window.fbq?.("track", event, params, { eventID: eventId });
}

function ttTrack(
  event: string,
  params: Record<string, unknown>,
  eventId: string,
  user?: PixelUserData
) {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID) return;
  setTikTokUser(user);
  window.ttq?.track(event, params, { event_id: eventId });
}

function snapTrack(
  event: string,
  params: Record<string, unknown>,
  eventId: string,
  user?: PixelUserData
) {
  if (typeof window === "undefined" || !SNAP_PIXEL_ID) return;
  const payload: Record<string, unknown> = {
    ...params,
    client_dedup_id: eventId,
  };
  if (user?.phone) {
    payload.phone_number = normalizePhoneE164(user.phone);
  }
  window.snaptr?.("track", event, payload);
}

// ─── CAPI forwarding ───────────────────────────────────────────────────────

async function sendCAPI(payload: CAPIEventPayload): Promise<void> {
  if (!API_URL) return;
  try {
    await fetch(`${API_URL}/tracking/capi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        page_url: window.location.href,
        client_user_agent: navigator.userAgent,
        fbp: getFbp() || undefined,
        fbc: getFbc() || undefined,
        ttp: getTtp() || undefined,
        scid: getScid() || undefined,
      }),
    });
  } catch {
    // Non-blocking
  }
}

// ─── Public event functions ──────────────────────────────────────────────────

export function trackViewContent(sku: string, value: number) {
  const eventId = getViewEventId(sku);
  const params = { content_ids: [sku], content_type: "product", value, currency: "KWD" };

  fbTrack("ViewContent", params, eventId);
  ttTrack("ViewContent", { content_id: sku, content_type: "product", value, currency: "KWD" }, eventId);
  snapTrack("VIEW_CONTENT", { item_ids: sku, price: value, currency: "KWD" }, eventId);

  sendCAPI({ event_name: "ViewContent", event_id: eventId, content_ids: [sku], value, currency: "KWD" });
}

export function trackAddToCart(sku: string, value: number) {
  const eventId = getATCEventId(sku);
  const params = { content_ids: [sku], content_type: "product", value, currency: "KWD" };

  fbTrack("AddToCart", params, eventId);
  ttTrack("AddToCart", { content_id: sku, content_type: "product", value, currency: "KWD" }, eventId);
  snapTrack("ADD_CART", { item_ids: sku, price: value, currency: "KWD" }, eventId);

  sendCAPI({ event_name: "AddToCart", event_id: eventId, content_ids: [sku], value, currency: "KWD" });
}

export function trackInitiateCheckout(total: number, skus: string[]) {
  const eventId = getICEventId();
  const params = {
    value: total,
    currency: "KWD",
    content_ids: skus,
    content_type: "product",
    num_items: skus.length,
  };

  fbTrack("InitiateCheckout", params, eventId);
  ttTrack("InitiateCheckout", { value: total, currency: "KWD", content_type: "product" }, eventId);
  snapTrack("START_CHECKOUT", { price: total, currency: "KWD", item_ids: skus.join(",") }, eventId);

  sendCAPI({
    event_name: "InitiateCheckout",
    event_id: eventId,
    content_ids: skus,
    value: total,
    currency: "KWD",
  });
}

/** Fires when checkout form is submitted — sends phone for matching */
export function trackLead(user: PixelUserData) {
  const eventId = getLeadEventId();

  fbTrack("Lead", { content_name: "COD Checkout", currency: "KWD" }, eventId, user);
  ttTrack("SubmitForm", { content_type: "lead", currency: "KWD" }, eventId, user);
  snapTrack("SIGN_UP", { currency: "KWD" }, eventId, user);

  sendCAPI({
    event_name: "Lead",
    event_id: eventId,
    currency: "KWD",
    customer_phone: user.phone,
    customer_name: user.name,
  });
}

export function trackPurchase(
  eventId: string,
  total: number,
  skus: string[],
  user?: PixelUserData,
  orderNumber?: string
) {
  // Prevent duplicate web pixel fires (OTO + thank-you page)
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("rk_purchase_fired") === eventId) return;
    sessionStorage.setItem("rk_purchase_fired", eventId);
  }

  const fbParams = {
    value: total,
    currency: "KWD",
    content_ids: skus,
    content_type: "product",
    num_items: skus.length,
    ...(orderNumber && { order_id: orderNumber }),
  };

  fbTrack("Purchase", fbParams, eventId, user);
  // Same event name on pixel + CAPI for TikTok dedup
  ttTrack("PlaceAnOrder", { value: total, currency: "KWD", content_type: "product", content_id: skus[0] }, eventId, user);
  snapTrack(
    "PURCHASE",
    {
      price: total,
      currency: "KWD",
      item_ids: skus.join(","),
      transaction_id: orderNumber ?? eventId,
    },
    eventId,
    user
  );

  // CAPI Purchase is handled server-side via /orders — no client CAPI call here
}
