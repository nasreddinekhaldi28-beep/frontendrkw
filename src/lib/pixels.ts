"use client";
import { v4 as uuidv4 } from "uuid";
import type { CAPIEventPayload } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID ?? "";

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
export function generatePurchaseEventId() {
  const id = uuidv4();
  if (typeof window !== "undefined") sessionStorage.setItem("rk_purchase", id);
  return id;
}
export function getStoredPurchaseEventId() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("rk_purchase") ?? "";
}

// ─── Declare globals typed loosely ─────────────────────────────────────────

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

// ─── Web pixel helpers (client-side only) ──────────────────────────────────

function fbTrack(event: string, params: Record<string, unknown>, eventId: string) {
  if (typeof window === "undefined" || !FB_PIXEL_ID) return;
  window.fbq?.("track", event, params, { eventID: eventId });
}

function ttTrack(event: string, params: Record<string, unknown>, eventId: string) {
  if (typeof window === "undefined" || !TIKTOK_PIXEL_ID) return;
  window.ttq?.track(event, params, { event_id: eventId });
}

function snapTrack(event: string, params: Record<string, unknown>, eventId: string) {
  if (typeof window === "undefined" || !SNAP_PIXEL_ID) return;
  window.snaptr?.("track", event, { ...params, client_dedup_id: eventId });
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
      }),
    });
  } catch {
    // Non-blocking — pixel errors should never break checkout
  }
}

// ─── Public event functions ────────────────────────────────────────────────

export function trackViewContent(sku: string, value: number) {
  const eventId = getViewEventId(sku);
  fbTrack("ViewContent", { content_ids: [sku], value, currency: "KWD" }, eventId);
  ttTrack("ViewContent", { content_id: sku, value, currency: "KWD" }, eventId);
  snapTrack("VIEW_CONTENT", { price: value, currency: "KWD" }, eventId);
  sendCAPI({ event_name: "ViewContent", event_id: eventId, content_ids: [sku], value, currency: "KWD" });
}

export function trackAddToCart(sku: string, value: number) {
  const eventId = getATCEventId(sku);
  fbTrack("AddToCart", { content_ids: [sku], value, currency: "KWD" }, eventId);
  ttTrack("AddToCart", { content_id: sku, value, currency: "KWD" }, eventId);
  snapTrack("ADD_CART", { price: value, currency: "KWD" }, eventId);
  sendCAPI({ event_name: "AddToCart", event_id: eventId, content_ids: [sku], value, currency: "KWD" });
}

export function trackInitiateCheckout(total: number, skus: string[]) {
  const eventId = getICEventId();
  fbTrack("InitiateCheckout", { value: total, currency: "KWD", content_ids: skus }, eventId);
  ttTrack("InitiateCheckout", { value: total, currency: "KWD" }, eventId);
  snapTrack("START_CHECKOUT", { price: total, currency: "KWD" }, eventId);
  sendCAPI({ event_name: "InitiateCheckout", event_id: eventId, content_ids: skus, value: total, currency: "KWD" });
}

export function trackPurchase(eventId: string, total: number, skus: string[]) {
  fbTrack("Purchase", { value: total, currency: "KWD", content_ids: skus }, eventId);
  ttTrack("PlaceAnOrder", { value: total, currency: "KWD" }, eventId);
  snapTrack("PURCHASE", { price: total, currency: "KWD" }, eventId);
  // CAPI for Purchase is handled server-side via /api/v1/orders
}
