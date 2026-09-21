export type LandUseType = 
  | 'Agricultural'
  | 'Commercial'
  | 'Residential'
  | 'Industrial'
  | 'Forest / Green Cover'
  | 'Water Body / Wetland'
  | 'Barren / Open'
  | 'Institutional';

export type ParcelStatus = 
  | 'Verified'
  | 'Under Review'
  | 'Encroachment Flagged'
  | 'Pending Ground Survey'
  | 'Policy Restricted';

export interface LandUseHistoryRecord {
  year: number;
  landUse: LandUseType;
  source: 'Survey of India' | 'Sentinel-2 Satellite' | 'Landsat 8' | 'Revenue Records' | 'Drone LiDAR' | 'Cartosat-3';
  confidence: number;
  areaHa: number;
  notes?: string;
}

export interface SatelliteObservationRecord {
  id: string;
  captureDate: string;
  satellite: 'Sentinel-2 MSI' | 'Landsat-9 OLI' | 'Cartosat-3' | 'RISAT-1A SAR';
  imageUri: string;
  ndvi: number; // Normalized Difference Vegetation Index (-1 to +1)
  ndwi: number; // Normalized Difference Water Index
  changeScore: number; // 0 to 100%
  resolution: string; // e.g., '10m' or '2.5m'
  detectedClass: LandUseType;
  thermalAnomalyKelvin?: number;
}

export interface SoilEnvironmentalIndicators {
  soilType: string; // e.g. "Alluvial Loam", "Black Cotton Soil", "Red Sandy Clay"
  phLevel: number; // e.g. 7.4
  organicCarbonPct: number; // e.g. 0.72%
  soilMoistureIndex: number; // % (e.g. 34%)
  erosionRisk: 'Low' | 'Moderate' | 'Severe';
  groundwaterDepthMeters: number; // e.g. 12.5m bgl
  floodInundationClass: 'Low Risk' | 'Zone II (Moderate)' | 'Zone IV (High Riparian)';
  airQualityIndexAQI: number;
}

export interface RelevantResearchItem {
  id: string;
  title: string;
  statuteOrGuideline: string;
  year: number;
  relevanceSummary: string;
  linkUrl?: string;
}

export interface ChangeHistoryItem {
  id: string;
  date: string;
  eventType: string;
  detectedChange: string;
  source: string;
  status: 'Verified' | 'Flagged' | 'Inspected';
  remarks: string;
}

export interface PolicyScenarioImpact {
  scenarioName: string;
  projectedZoning: string;
  restrictionLevel: 'Unrestricted' | 'Conditional Approval' | 'Strict Moratorium';
  carbonCreditYieldTons: number;
  economicImpactText: string;
}

export interface ParcelLocation {
  state: string;
  district: string;
  tehsil: string;
  village: string;
  pincode: string;
  coordinatesText: string;
}

export interface Parcel {
  id: string;
  
  // 1. Parcel ID & Reference
  parcelCode: string; // e.g. "UP-VNS-SRN-0412"
  khasraNo: string; // e.g. "Khasra 412/1"
  officialReference: string;
  
  // 2. Land Category
  landCategory: string; // e.g. "Category I-A: Prime Irrigated Multi-crop Farmland"
  
  // 3. Area
  areaHectares: number;
  areaAcres: number;
  areaSqMeters: number;
  perimeterMeters: number;
  
  // 4. Current Land Use
  currentLandUse: LandUseType;
  registeredLandUse: LandUseType;
  status: ParcelStatus;
  lastUpdated: string;
  complianceScore: number; // 0 - 100%
  
  // 5. Historical Land Use
  history: LandUseHistoryRecord[];
  
  // 6. Location
  state: string;
  district: string;
  tehsil: string;
  village: string;
  locationDetails?: ParcelLocation;
  coordinates: [number, number][]; // Polygon coordinates [lat, lng]
  center: [number, number]; // [lat, lng]
  
  // Ownership details
  ownerName: string;
  ownerType: 'Private' | 'Government' | 'Panchayat' | 'Trust';

  // 7. Soil / Environmental Indicators
  soilEnvironmentalIndicators: SoilEnvironmentalIndicators;

  // 8. Nearby Infrastructure
  nearbyInfrastructure: string[];

  // 9. Satellite Observations
  latestObservation: SatelliteObservationRecord;
  satelliteObservations?: SatelliteObservationRecord[];

  // 10. Change History
  changeHistory: ChangeHistoryItem[];

  // 11. Relevant Research & Legal Provisions
  relevantResearch: RelevantResearchItem[];

  // 12. Policy Scenarios & Projected Impact
  policyScenariosImpact: PolicyScenarioImpact[];

  // Risk & Spatial Analysis
  riskScore: number;
  floodRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  zoningViolation: boolean;
  nearWetlandBuffer: boolean;
}

export interface ChangeEvent {
  id: string;
  parcelId: string;
  parcelCode: string;
  khasraNo: string;
  location: string;
  detectionDate: string;
  detectedType: string;
  previousClass: LandUseType;
  newDetectedClass: LandUseType;
  confidence: number;
  evidenceUriBefore: string;
  evidenceUriAfter: string;
  status: 'Pending Verification' | 'Approved' | 'Rejected' | 'Field Survey Dispatched';
  description: string;
  flagSeverity: 'High' | 'Medium' | 'Low';
  assignedSurveyor?: string;
}

export interface PolicyScenario {
  id: string;
  name: string;
  description: string;
  regionId: string;
  regionName: string;
  baseYear: number;
  targetYear: number;
  parameters: {
    urbanExpansionRate: number; // % per year (e.g. 3.5%)
    greenBufferSetback: number; // meters (e.g. 150m)
    industrialZoneQuota: number; // % of district (e.g. 12%)
    agriculturalProtectionWeight: number; // 1 to 10
    floodPlainBufferStrictness: number; // 1 to 10
    populationGrowthRate: number; // %
  };
  results?: {
    urbanGrowthHa: number;
    agriculturalLossHa: number;
    forestCoverDeltaHa: number;
    carbonOffsetTonsDelta: number;
    revenueImpactCrores: number;
    foodSecurityIndexDelta: number;
    affectedParcelsCount: number;
  };
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  author: string;
  year: number;
  state: string;
  district: string;
  topic: 'Zoning & Master Plan' | 'Revenue & Land Reforms' | 'Environmental & Wetland Protection' | 'Remote Sensing & GIS';
  fileUri: string;
  accessLevel: 'Public' | 'Government Official' | 'Restricted';
  snippet: string;
  citation: string;
  matchScore?: number;
}

export interface User {
  id: string;
  name: string;
  role: 'District Magistrate / Collector' | 'Town Planning Officer' | 'GIS Analyst' | 'Field Revenue Inspector';
  email: string;
  department: string;
}

export interface IndianCity {
  name: string;
  district: string;
  coordinates: [number, number]; // [lat, lng]
  hasSampleParcels?: boolean;
  monitoredParcelsCount?: number;
}

export interface IndianState {
  name: string;
  code: string;
  type: 'State' | 'Union Territory';
  capital: string;
  center: [number, number];
  cities: IndianCity[];
}
