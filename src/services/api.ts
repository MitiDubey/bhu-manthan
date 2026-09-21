import { Parcel } from '../types';
import { mockParcels } from '../data/parcels';

/**
 * Backend API Service Layer for BHU-MANTHAN Digital Twin
 * 
 * Simulates asynchronous requests to FastAPI + PostgreSQL/PostGIS endpoints.
 * When real backend is running, set VITE_USE_REAL_API=true in .env
 */
const USE_REAL_API = false;
const BACKEND_BASE_URL = 'http://localhost:8000/api/v1';

export const parcelService = {
  /**
   * Fetches comprehensive 12-field Digital Twin details for a specific parcel
   * Endpoints simulated:
   * GET /api/v1/parcels/{id}/full-twin-details
   */
  async getParcelDetails(parcelId: string): Promise<Parcel> {
    if (USE_REAL_API) {
      const response = await fetch(`${BACKEND_BASE_URL}/parcels/${parcelId}/full-twin-details`);
      if (!response.ok) {
        throw new Error(`Failed to fetch parcel from backend: ${response.statusText}`);
      }
      return await response.json();
    }

    // Realistic API network latency simulation (350ms)
    await new Promise(resolve => setTimeout(resolve, 350));

    const parcel = mockParcels.find(
      p => p.id === parcelId || p.parcelCode === parcelId || p.khasraNo === parcelId
    );

    if (!parcel) {
      // Fallback to first parcel if not found by exact ID
      return mockParcels[0];
    }

    return parcel;
  },

  /**
   * Fetches parcels filtered by State and City / District
   */
  async getParcelsByGeography(stateName: string, cityName: string): Promise<Parcel[]> {
    if (USE_REAL_API) {
      const response = await fetch(
        `${BACKEND_BASE_URL}/parcels?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(cityName)}`
      );
      return await response.json();
    }

    await new Promise(resolve => setTimeout(resolve, 200));

    const filtered = mockParcels.filter(
      p =>
        p.state.toLowerCase() === stateName.toLowerCase() ||
        p.district.toLowerCase() === cityName.toLowerCase() ||
        cityName.toLowerCase().includes(p.district.toLowerCase())
    );

    return filtered.length > 0 ? filtered : mockParcels;
  },
};
