"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import OTOModal from "@/components/checkout/OTOModal";

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <OTOModal />
    </>
  );
}
