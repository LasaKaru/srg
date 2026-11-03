# Fruit Farm Logistics & Fleet Management System
## Software Requirements Specification (SRS) - Serverless Next.js Edition

### 1. System Overview
This is a standalone, serverless Progressive Web Application (PWA) built with Next.js. It is designed to manage dispatch, farm pickup, and delivery tracking entirely on the client side. The application does not rely on a backend, database, or API. All trip, inventory, and user data is stored locally in the browser's storage as JSON. Managers can extract data by generating and downloading CSV, Excel, or JSON backup files directly from the browser.

### 2. Architecture & Data Management
*   **Framework:** Next.js (React) configured for static export (`output: 'export'`).
*   **Data Storage:** Browser-based storage (`IndexedDB` or `localStorage`) to maintain JSON data continuously without a server. 
*   **PWA Capabilities:** The Next.js app will be configured as a PWA, allowing users to "Install" it to their mobile home screens and use it completely offline.
*   **File Generation (Export/Import):**
    *   *JSON Sync:* A feature to "Export Data" (downloads a `.json` file of all local data) and "Import Data" (uploads a `.json` file to restore or merge records).
    *   *Reports:* Client-side libraries (like `SheetJS` for Excel or `PapaParse` for CSV) will convert local JSON arrays into downloadable `.csv` or `.xlsx` files.

### 3. User Profiles (Local Context)
Since there is no secure backend, traditional Role-Based Access Control (RBAC) is replaced by **Local Profile Modes**. The user selects their mode upon opening the app:
*   **Admin/Manager Mode:** Protected by a simple local PIN. Has access to view all stored JSON data, view historical trips, and trigger CSV/Excel/JSON downloads.
*   **Driver Mode:** The operational interface. Can only start trips, log statuses, scan codes, and end trips.

### 4. Core Functional Requirements

#### 4.1 Trip & Status Workflow
*   **Initialization:** Driver enters their Name, Vehicle Number, and **Start Meter Reading**, then taps "Start Trip".
*   **Time & State Tracking:** The app logs local device timestamps as the driver taps through the workflow buttons:
    *   *Arrived at Farm*
    *   *Loading Started*
    *   *Loading Completed* (Calculates waiting/loading duration)
    *   *Trip Ended* (Prompts for **End Meter Reading**)

#### 4.2 Local Location Capture
*   Instead of continuous live tracking (which requires a server), the app uses the HTML5 Geolocation API to capture the exact GPS coordinates (Latitude/Longitude) at the exact moment the driver taps a status button (e.g., tagging the coordinates of "Arrived at Farm" or "Trip Ended").

#### 4.3 Dynamic Load & Inventory Logging
*   **Multi-Block Input:** Drivers can dynamically add rows to their current trip manifest. Each row requires `[Block No]` and `[Load Qty]`.
*   **Scanner Integration:** Integration of a client-side barcode/QR scanner (e.g., `html5-qrcode`) utilizing the device camera to read crate/block codes and auto-fill the `Block No` field.
*   **Frontend QR Generation (Digital Token):** Once the load is submitted, the Next.js app generates a QR code on the screen containing a JSON string of the load summary. A manager can scan this screen to verify the data.

#### 4.4 Discrepancy & Issue Logging
*   Drivers can add notes to a trip before closing it (e.g., "Missing 2kg from Block A").
*   *Note on Photos:* Since there is no server to host images, photo capture will either be omitted, or the app can store small, highly-compressed base64 image strings in the local JSON (use sparingly to avoid crashing browser storage limits).

#### 4.5 Reporting & Data Export (Manager Mode)
*   **Data Table UI:** A responsive data grid showing all completed trips currently stored on the device.
*   **One-Click Export:** 
    *   `Download CSV`: Generates a comma-separated file of all trip logs and multi-block load details.
    *   `Download Excel`: Generates a formatted `.xlsx` spreadsheet.
    *   `Backup JSON`: Downloads the raw database state so it can be emailed or transferred to another device.

#### 4.6 Localization
*   **Bilingual Toggle:** React Context will be used to swap UI strings between **English** and **Sinhala (සිංහල)** instantly without needing to reload the page.

### 5. Standard Operating Procedure (Workflow Example)
1.  **Morning Setup:** Admin opens the web app on a shared tablet, ensuring the browser storage is clear or ready for the day. 
2.  **Dispatch:** Driver selects "Driver Mode", switches language to Sinhala, enters Odometer, and clicks "Start Trip".
3.  **Operations:** Driver drives to the farm, clicks "Arrived" (app saves timestamp and GPS). 
4.  **Loading:** Driver scans 3 crates, adding 3 rows of loads to the app interface.
5.  **Completion:** Driver finishes the delivery, clicks "End Trip", and enters the final Odometer reading. The app calculates total distance and time, saving the completed trip object to local JSON.
6.  **End of Day:** The Admin enters Manager Mode, clicks "Export to Excel", and a `.xlsx` file is immediately downloaded to the device containing the day's operations. The Admin also clicks "Backup JSON" to save a copy of the database to their local hard drive.