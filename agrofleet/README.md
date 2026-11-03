# S R G AgroFleet (එස් ආර් ජී ඇග්‍රෝෆ්ලීට්)
## S R G HOLDINGS (PVT) LTD

> **Sri Lankan Exporter of Quality Products to the Global Market**  
> **Registered with the Sri Lanka Export Development Board (EDB)**  
> Fruit Farm Harvest, Cold Chain Dispatch & Fleet Logistics Progressive Web Application (PWA)

---

## 🌟 Key Features & Updates

1. **Sinhala Font Integration**:
   - Integrated **Noto Sans Sinhala** from Google Fonts (`app/globals.css` and `app/layout.tsx`).
   - Ensures crisp, beautiful, and native Unicode typography for all Sinhala headings, buttons, and form labels.
   - Clean bilingual toggle (**English / සිංහල**) available on both the Login screen and inside the application.

2. **Official Branding for S R G HOLDINGS (PVT) LTD**:
   - Company Logo (`/srg-logo.png`) displayed prominently across the portal.
   - Verified **Sri Lanka Export Development Board (EDB) Registered Exporter** badge and crest.
   - Reports (CSV, Excel `.xls`, and JSON backup) automatically branded with official export credentials and company headings.

3. **Secure Multi-Role Login Page**:
   - **Driver Terminal Login**: Select Driver (Kasun Perera, Nuwan Pradeep, Chathura Silva, etc.). Auto-fills vehicle registration and odometer history.
   - **Operations & EDB Admin Portal**: PIN-protected (`1234` or `0000`) for full compliance auditing, harvest analytics, and export file generation.
   - **Farm Stock Controller**: Ruwan Wijesinghe (farm gate validation & token scanning).
   - **1-Click Quick Access**: Instant demo switchers for rapid field testing.
   - **Session Persistence & Logout**: Remembers authenticated user in browser `localStorage` and provides an instant **Logout (ඉවත් වන්න)** button in the header.

4. **100% Serverless & Offline Capable**:
   - All dispatch trips, farm block stocks, and user roles are maintained in browser `localStorage`.
   - Never loses active trip progress on browser refresh or loss of cell signal.

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js v18+ (tested on Node.js v22)
- npm v9+

### 2. Running in Development Mode
```bash
cd "d:\helao2 projects\srg\agrofleet"
npm run dev
```
Open your browser and visit: [http://localhost:3000](http://localhost:3000)

### 3. Running in Production Mode
```bash
cd "d:\helao2 projects\srg\agrofleet"
npm run build
npm run start
```

---

## 🔐 Credentials & Access Profiles

| Role | Profile | Access Credentials |
|---|---|---|
| **Logistics Admin** | Dinesh Fernando | PIN: `1234` (or 1-Click Quick Login) |
| **Driver** | Kasun Perera (`WP LB-4582`) | Select from list / PIN: `0000` |
| **Driver** | Nuwan Pradeep (`NC KA-9910`) | Select from list / PIN: `0000` |
| **Driver** | Chathura Silva (`WP LD-1120`) | Select from list / PIN: `0000` |
| **Farm Stock Controller** | Ruwan Wijesinghe | PIN: `1234` / 1-Click Quick Login |

---

## 📁 Project Structure

```
d:\helao2 projects\srg\agrofleet/
├── app/
│   ├── globals.css          # Noto Sans Sinhala Google font import & Tailwind CSS
│   ├── layout.tsx           # PWA metadata, Viewport, and font preloading
│   └── page.tsx             # Client-side dynamic loader (SSR bypassed for browser APIs)
├── components/
│   └── AgroFleetApp.tsx     # Full S R G Holdings logic, Login page, Driver & Manager portals
├── public/
│   ├── srg-logo.png         # S R G Holdings official company logo
│   ├── manifest.json        # PWA progressive web app manifest
│   ├── icon-192.png         # App launcher icon
│   └── icon-512.png         # High-resolution splash icon
├── package.json             # Next.js 14, React 18, Lucide React, Tailwind
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js compiler settings
└── tsconfig.json            # TypeScript configuration
```
