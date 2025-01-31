import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Tajawal } from "next/font/google";
import { Providers } from "../components/Providers";
import AuthProvider from "../app/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import Footer from "../sections/Footer/Footer";
import Header from "./../sections/header/header";
import InstallPWA from "../components/InstallPWA/Components/InstallPWA";

const tajawal = Tajawal({
  weight: ["400", "700"],
  subsets: ["arabic"],
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "الرئيسية - الأكاديمية العربية للبرمجة",
  description:
    "تقدم الأكاديمية العربية للبرمجة دورات متخصصة لتعليم البرمجة باللغة العربية، حيث يمكن للطلاب اكتساب المهارات التقنية وتعلمة لغات البرمجة من خلال محتوى تعليمي مميز ومناسب للناطقين باللغة العربية",
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "الأكاديمية العربية للبرمجة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="الاكاديمية العربية للبرمجة  "
        />
        <link rel="apple-touch-icon" href="/images/pwaphone.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tajawal.className} antialiased`}
      >
        <ToastContainer position="bottom-center" />
        <AuthProvider>
          <Providers>
            <Header />
            <InstallPWA />
            {children}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
