# BHU-MANTHAN | Dynamic Digital-Twin Land Governance Platform

> **Database Architecture & Dynamic Digital-Twin UI Platform**  
> _Developed for the Smart India Hackathon (SIH) & Modern Geospatial Land Governance_

---

## 🌍 Overview

**BHU-MANTHAN** transforms static, disjointed land records into an interactive, real-time **Living Digital Twin**. It unifies:

- **Cadastral Revenue Records**: Khasra/parcel boundaries, ownership provenance, and zoning classification.
- **Multispectral Satellite Remote Sensing**: High-resolution Sentinel-2 MSI and Cartosat-3 feeds with automated NDVI / NDWI change detection.
- **AI-Powered What-If Policy Simulation**: Real-time recalculation of urban growth, farmland preservation, and environmental buffer trade-offs.
- **pgvector Semantic Legal Intelligence**: Vectorized retrieval over state revenue codes (e.g. UP Revenue Code Section 143/80), National Green Tribunal (NGT) directives, and Varanasi Master Plan 2031.
- **Human-in-the-Loop Change Verification**: Split-screen satellite audit queue before official mutation of cadastral records.

---

## 🚀 The 9 Frontend Modules

| Page  | Module                   | Route / Key Features                                                                                                                                                                             |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1** | **Landing Page**         | Three.js interactive 3D rotating Earth globe, telemetry coordinates, scroll storytelling, end-to-end architecture pipeline                                                                       |
| **2** | **Dashboard**            | Executive command center, key KPIs (Area, Parcels, Flagged Encroachments), mini-map, monthly verification trends, live alerts feed                                                               |
| **3** | **Digital Twin (Core)**  | Fullscreen interactive map (Varanasi Sarnath corridor), 2D/3D tilt mode, clickable Khasra polygons, comprehensive slide-out panel (Identity, History 2018–2025, NDVI, Risks, Simulation trigger) |
| **4** | **GIS Explorer**         | Multi-spectral layer manager (Cadastre, Master Plan 2031, Satellite Ortho, Wetland basin), 2020–2025 temporal timeline slider, land-use category filtering                                       |
| **5** | **Policy Simulation**    | Dynamic parameter sliders (Urban velocity, River setback, Industrial quota, Farmland protection), live recalculation engine, baseline vs. projected comparative charts, impacted parcels preview |
| **6** | **AI Legal Research**    | RAG semantic question answering with confidence scoring and direct citations to UP Revenue Code, NGT orders, and Master Plans                                                                    |
| **7** | **Geospatial Analytics** | Multi-year stacked area charts (2019–2025), urban expansion velocity vs. agricultural displacement, tehsil-level compliance matrix                                                               |
| **8** | **Knowledge Hub**        | Searchable repository for legal gazettes, technical GIS manuals, and environmental guidelines with excerpt viewer and citation copying                                                           |
| **9** | **Land Updates Queue**   | Human-in-the-loop review workflow, interactive Before/After satellite slider, approval/rejection/field survey dispatch actions                                                                   |

---

## 🛠️ Technology Stack

- **UI Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Geospatial Cyber Dark Theme) + Glassmorphism HUD
- **3D Globe**: Three.js
- **Cadastral GIS Mapping**: Leaflet + React-Leaflet
- **Analytics & Charts**: Recharts
- **Icons**: Lucide React
- **Celebration Effects**: Canvas-Confetti

---

## 💻 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build

```bash
npm run build
```

---

## 🎬 Recommended SIH Demo Sequence

1. **Landing Page**: Start on the 3D rotating globe, showcase the architecture data flow (Raw Data Lake → PostGIS → AI → Decision Support).
2. **Digital Twin**: Click **"LAUNCH DIGITAL TWIN"** to zoom into the Varanasi Sarnath study corridor.
3. **Parcel Inspection**: Click **Khasra 413/Ga** (flagged commercial warehouse on farmland) to open the contextual drawer. Review historical land-use progression (2018–2025) and satellite NDVI evidence.
4. **Policy Simulation**: Click **"Run Policy Simulation on this Parcel"** to open the simulator. Adjust the _River Buffer Setback_ and _Urban Growth Velocity_ sliders, then click **"Execute Policy Simulation"** to witness real-time chart recalculation.
5. **Human-in-the-loop Verification**: Navigate to **Land Updates Queue** via the top alert bell. Drag the Before/After slider to contrast 2022 farmland against 2025 unauthorized construction, then click **"Dispatch Ground Truth Survey"** or **"Approve & Mutate Twin State"**.
6. **AI Legal Research**: Ask _"Can agricultural land be converted to commercial warehousing without Sec 80?"_ to display the AI response with verified statutory citations.
