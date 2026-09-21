import type { UnconnectedAreaInspectionResult } from '../types/parcel';

const API_URL = import.meta.env.VITE_LULC_API_URL || 'http://localhost:8000/api/lulc';

export async function fetchBhuvanLulc(lat: number, lng: number): Promise<NonNullable<UnconnectedAreaInspectionResult['bhuvan_lulc']>> {
  try {
    const response = await fetch(`${API_URL}?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`);
    if (!response.ok) throw new Error(`LULC API HTTP ${response.status}`);
    return await response.json();
  } catch {
    return { success: false, available: false, message: 'Not available from connected Bhuvan source.' };
  }
}
