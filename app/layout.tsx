import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roda Car Rental | Premium Vehicle Rentals | Book Online",
  description:
    "Roda Car Rental — Premium vehicle rentals at competitive prices. Book sedans, SUVs, and luxury cars online. Easy booking, flexible pickup, and 24/7 support.",
  keywords: "car rental, vehicle hire, rent a car, SUV rental, luxury car rental, Roda",
  openGraph: {
    title: "Roda Car Rental | Premium Vehicle Rentals",
    description:
      "Book your perfect ride. Premium cars, competitive prices, hassle-free experience.",
    type: "website",
    siteName: "Roda Car Rental",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roda Car Rental | Premium Vehicle Rentals",
    description: "Book your perfect ride online.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: "Roda Car Rental",
  description: "Premium vehicle rentals at competitive prices.",
  url: "https://roda-rentals.com",
  telephone: "+351912345678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida da Liberdade, 110",
    addressLocality: "Lisbon",
    postalCode: "1250-146",
    addressCountry: "PT",
  },
  priceRange: "$$",
  openingHours: ["Mo-Sa 08:00-20:00", "Su 09:00-18:00"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
