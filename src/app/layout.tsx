import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/ui/ContactModal";
import FloatingContact from "@/components/ui/FloatingContact";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://soyuzstroy.ru"),
  title: {
    default: "ООО Союз Строй — Строительство, Фасады и Дизайн в Махачкале и Дагестане",
    template: "%s | ООО Союз Строй Махачкала",
  },
  description:
    "ООО Союз Строй в Махачкале: дизайн-проектирование, вентилируемые фасады, ландшафт и интерьеры по всему Дагестану. Превращаем ваши идеи в реальность с гарантией качества.",
  keywords: [
    "строительство дагестан",
    "ремонт махачкала",
    "вентилируемые фасады махачкала",
    "дизайн проект дагестан",
    "облицовка фасадов махачкала",
    "ландшафтный дизайн дагестан",
    "дизайн интерьера махачкала",
    "союз строй махачкала",
  ],
  openGraph: {
    title: "ООО Союз Строй — Строительство, Фасады и Дизайн в Махачкале и Дагестане",
    description:
      "Профессиональная отделка и дизайн в Махачкале. Облицовка фасадов, ландшафт, интерьеры по всему Дагестану — всё в одной компании.",
    url: "/",
    siteName: "Союз Строй",
    images: [
      {
        url: "/images/portfolio/IMG_8784.PNG",
        width: 1200,
        height: 630,
        alt: "Союз Строй Превью",
      },
    ],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "ООО Союз Строй — Строительство, Фасады и Дизайн в Махачкале и Дагестане",
    description: "Профессиональная отделка и дизайн в Махачкале. Облицовка фасадов, ландшафт, интерьеры по всему Дагестану — всё в одной компании.",
    images: ["/images/portfolio/IMG_8784.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ООО Союз Строй",
    image: "https://soyuzstroy.ru/images/logo-original.png",
    "@id": "https://soyuzstroy.ru",
    url: "https://soyuzstroy.ru",
    telephone: "+79931464566",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Хаджи Булача 14",
      addressLocality: "г. Махачкала",
      addressRegion: "Республика Дагестан",
      postalCode: "",
      addressCountry: "RU"
    },
    areaServed: {
      "@type": "State",
      name: "Республика Дагестан"
    }
  };

  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ContactModal />
        <FloatingContact />
      </body>
    </html>
  );
}
