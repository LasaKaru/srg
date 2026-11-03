import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'S R G AgroFleet - S R G HOLDINGS (PVT) LTD | EDB Registered Exporter',
  description: 'Fruit Farm Dispatch, Harvest & Cold Chain Logistics PWA for S R G HOLDINGS (PVT) LTD - Sri Lankan Exporter of Quality Products to the Global Market, Registered with the Sri Lanka Export Development Board (EDB).',
  manifest: '/manifest.json',
  icons: {
    icon: '/srg-logo.png',
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#065f46',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="si">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-slate-50 text-slate-800">{children}</body>
    </html>
  )
}
