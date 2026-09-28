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

  // Module 8: Dispute & Compensation Intelligence
  ulpIn?: string; // 14-digit Unique Land Parcel Identification Number (Bhu-Aadhaar)
  disputeInfo?: DisputeRecord;
  compensationInfo?: CompensationRecord;
}

export interface DisputeTimelineEvent {
  date: string;
  stage: string;
  orderSummary: string;
  courtAuthority: string;
}

export interface DisputeRecord {
  id: string;
  status: 'Active Litigation' | 'Revenue Court Sub-Judice' | 'Resolved' | 'No Dispute';
  category: 'Boundary Overlap' | 'Title Contestation' | 'Heirship Dispute' | 'Compensation Grievance' | 'Zoning Dispute';
  authority: string; // e.g. "Tehsildar Court Sarnath", "High Court of Judicature at Allahabad", "District Magistrate Land Tribunal", "CPGRAMS / Revenue Grievance Board"
  caseNumber: string; // e.g. "NJDG-UP-VNS-2023-4912"
  cnrNumber?: string;
  filingDate: string;
  nextHearingDate?: string;
  disputeAreaHa?: number;
  partiesInvolved: string;
  timeline: DisputeTimelineEvent[];
}

export interface CompensationRecord {
  id: string;
  schemeName: string; // e.g. "Varanasi Ring Road Ph-2 Land Acquisition", "Dedicated Freight Corridor (DFCCIL) Buffer"
  sanctionedAmountInr: number; // e.g. 4500000 (₹45 Lakhs)
  disbursedAmountInr: number;
  pendingAmountInr: number;
  status: 'Fully Disbursed' | 'Partially Disbursed' | 'Escrow Held / Pending Dispute' | 'Under Revenue Assessment' | 'Not Applicable';
  pendingDurationDays: number;
  bankAccountLinked: boolean;
  dbtStatus: 'Credited' | 'Awaiting Aadhaar Authentication' | 'Held by Revenue Order' | 'N/A';
  landAreaAcquiredHa: number;
  competentAuthority: string;
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

  // Module 3: Verification Prioritization pipeline fields (Pages 2-3 of PDF)
  changeMagnitude: 'High' | 'Medium' | 'Low';
  dataQuality: 'High (Cartosat-3 2.5m)' | 'Moderate (Sentinel-2 10m)' | 'Low (Cloud Shadow)';
  governanceRelevance: 'High' | 'Medium' | 'Low';
  priorityScore: number; // 0 - 100
  reviewerQueue: 'Authorized Reviewer' | 'Review Queue' | 'Monitoring / Batch Review';
  verificationOrderNo?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  officialResolutionNotes?: string;
}

export interface PolicyFeedbackRecord {
  id: string;
  policyName: string;
  implementedYear: number;
  evaluationYear: number;
  geography: string;
  predictedFarmlandLossHa: number;
  actualFarmlandLossHa: number;
  predictedUrbanGainHa: number;
  actualUrbanGainHa: number;
  predictedRevenueCr: number;
  actualRevenueCr: number;
  effectivenessScorePct: number; // e.g. 84.2%
  modelAdjustmentNotes: string;
  observedEvidenceSource: string;
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

export type KnowledgeDocType = 
  | 'Research Papers'
  | 'Policy Documents'
  | 'Legal Documents'
  | 'Datasets'
  | 'Case Studies'
  | 'Project Reports'
  | 'GIS Resources'
  | 'Satellite Resources';

export interface KnowledgeDocument {
  id: string;
  title: string;
  author: string;
  year: number;
  state: string;
  district: string;
  topic: 'Zoning & Master Plan' | 'Revenue & Land Reforms' | 'Environmental & Wetland Protection' | 'Remote Sensing & GIS';
  docType: KnowledgeDocType;
  source: string;
  version: string;
  keywords: string[];
  fileUri: string;
  accessLevel: 'Public' | 'Government Official' | 'Restricted';
  snippet: string;
  citation: string;
  matchScore?: number;
}

export interface User {
  id: string;
  name: string;
  role: 
    | 'Public User'
    | 'Researcher'
    | 'District Magistrate / Collector'
    | 'Authorized Reviewer (Tehsildar)'
    | 'Town Planning Officer'
    | 'GIS Analyst'
    | 'Field Revenue Inspector'
    | 'Institutional Partner (IIT/ISRO)'
    | 'System Administrator';
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

