"use client";
import { create } from "zustand";
import type { CheckoutFormData, CheckoutStep, OTOProduct } from "@/types";

interface CheckoutStore {
  step: CheckoutStep;
  formData: CheckoutFormData | null;
  otoProduct: OTOProduct | null;
  otoAccepted: boolean;
  purchaseEventId: string | null;

  openCheckout: () => void;
  closeCheckout: () => void;
  submitForm: (data: CheckoutFormData, otp: OTOProduct | null, eventId: string) => void;
  acceptOTO: () => void;
  declineOTO: () => void;
  setSubmitting: () => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  step: "idle",
  formData: null,
  otoProduct: null,
  otoAccepted: false,
  purchaseEventId: null,

  openCheckout: () => set({ step: "checkout" }),
  closeCheckout: () => set({ step: "idle" }),

  submitForm: (data, otp, eventId) =>
    set({ formData: data, otoProduct: otp, step: "oto", purchaseEventId: eventId }),

  acceptOTO: () => set({ otoAccepted: true }),
  declineOTO: () => set({ otoAccepted: false }),

  setSubmitting: () => set({ step: "submitting" }),

  reset: () =>
    set({
      step: "idle",
      formData: null,
      otoProduct: null,
      otoAccepted: false,
      purchaseEventId: null,
    }),
}));
