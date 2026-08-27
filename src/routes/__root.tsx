import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

const APP_NAME = "Mutelu ศึกพิกัดสายมู | JeMC";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "บอร์ดเกมคณิตศาสตร์เชิงผจญภัยบน Cartesian Grid ที่เปลี่ยนการคำนวณเวกเตอร์ให้กลายเป็นเส้นทางตามล่าพิกัดสายบุญทั่วไทย โดยทีม JeMC โรงเรียนศึกษานารี",
      },
      { name: "theme-color", content: "#151126" },
      { name: "author", content: "JeMC (เจมซี)" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="th" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="thai-pattern min-h-dvh">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
