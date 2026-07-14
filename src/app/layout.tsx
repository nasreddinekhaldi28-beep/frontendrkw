import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StoreShell from "@/components/layout/StoreShell";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "راحة الكويت | أجهزة العلاج المنزلي #1",
  description:
    "راحة الكويت — أجهزة الحجامة الكهربائية ومساج الأقدام وجل المفاصل. علاج احترافي في بيتك مع ضمان الجودة والتوصيل 1-2 يوم.",
  keywords: "حجامة, مساج أقدام, ألم الظهر, علاج مفاصل, كويت, راحة الكويت",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rahatkwt.store"),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "راحة الكويت | أجهزة العلاج المنزلي #1",
    description: "علاج احترافي في بيتك — توصيل 1-2 يوم — الدفع عند الاستلام",
    type: "website",
    locale: "ar_KW",
    images: [{ url: "/android-chrome-512x512.png" }],
  },
};

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1165746342434895";
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo">
        <StoreShell>{children}</StoreShell>

        {/* ─── Facebook Pixel (lazy — deferred until page idle) ─────── */}
        {FB_PIXEL_ID && (
          <Script id="fb-pixel" strategy="lazyOnload">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {/* ─── TikTok Pixel (lazy — deferred until page idle) ───────── */}
        {TIKTOK_PIXEL_ID && (
          <Script id="tiktok-pixel" strategy="lazyOnload">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
                ttq._o=ttq._o||{};ttq._o[e]=n||{};var a=document.createElement("script");
                a.type="text/javascript";a.async=!0;a.src=r+"?sdkid="+e+"&lib="+t;
                var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
                ttq.load('${TIKTOK_PIXEL_ID}');ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}

        {/* ─── Snapchat Pixel (lazy) ─────────────────────────────────── */}
        {SNAP_PIXEL_ID && (
          <Script id="snap-pixel" strategy="lazyOnload">
            {`
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);})(window,document,
              'https://sc-static.net/scevent.min.js');
              snaptr('init', '${SNAP_PIXEL_ID}');
              snaptr('track', 'PAGE_VIEW');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
