"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), { ssr: false });
const CheckoutModal = dynamic(() => import("@/components/checkout/CheckoutModal"), { ssr: false });
const OTOModal = dynamic(() => import("@/components/checkout/OTOModal"), { ssr: false });

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
