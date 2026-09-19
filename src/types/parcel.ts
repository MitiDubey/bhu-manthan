export type LandUseType = 'Agriculture' | 'Built-up' | 'Water' | 'Forest' | 'Vacant';

export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export type BhuvanLulcPeriod = '2005-06' | '2011-12' | '2015-16';

export type BhuvanLulcClass = 
  | 'Agriculture (Kharif / Rabi)' 
  | 'Built-up (Urban / Rural)' 
  | 'Forest & Scrub' 
  | 'Water Body / Canal' 
  | 'Wasteland & Ravinous';

export interface LulcClassStat {
  className: BhuvanLulcClass;
  area_ha: number;
  percentage: number;
  color: string;
}

export interface AoiLulcRecord {
  aoi_name: string;
  aoi_level: 'Parcel' | 'Village' | 'Tehsil' | 'District' | 'Custom AOI';
  year: BhuvanLulcPeriod;
  total_area_ha: number;
  source: string;
  classes: LulcClassStat[];
}

export interface HistoricalLandUseItem {
  year: number;
  use: string;
  source: string;
  notes: string;
}

export interface SoilEnvironmentalIndicators {
  soil_type: string;
  soil_ph: number;
  organic_carbon_percent: number;
  soil_moisture_regime: string;
  ndvi_current: number;
  ndvi_baseline: number;
  land_degradation_risk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  groundwater_table_depth: string;
  flood_drainage_vulnerability: string;
}

export interface NearbyInfrastructureItem {
  name: string;
  category: 'Highway' | 'Canal' | 'Aviation' | 'Power' | 'Railway' | 'Urban Center';
  distance_km: number;
  governance_impact: string;
}

export interface SatelliteObservationData {
  primary_sensor: string;
  resolution_meters: number;
  last_acquisition_utc: string;
  cloud_cover_percent: number;
  revisit_cycle_days: number;
  spectral_bands_used: string;
  surface_reflectance_quality: 'High' | 'Moderate' | 'Marginal';
}

export interface ChangeHistoryItem {
  date: string;
  event: string;
  affected_area_ha: number;
  affected_area_percent: number;
  detected_by: string;
  confidence_score: number;
  action_status: 'Pending Verification' | 'Field Notice Issued' | 'Regularized' | 'Clean';
}

export interface ResearchCitation {
  title: string;
  source_institution: string;
  year: number;
  key_finding: string;
}

export interface PolicyScenario {
  scenario_name: string;
  zoning_status: string;
  projected_runoff_change: string;
  heat_island_delta: string;
  revenue_implication: string;
  recommendation: string;
}

export type DataProvenanceCategory = 
  | 'REAL_SOURCE_DATA'
  | 'DERIVED_EO_DATA'
  | 'CURRENT_MODEL_ENVIRONMENTAL'
  | 'SIMULATION_DATA';

export type ParcelDataStatus = 'Authoritative / Verified' | 'Prototype / Synthetic Placeholder';

export interface UnconnectedAreaInspectionResult {
  coordinates: [number, number];
  admin: {
    state?: string;
    district?: string;
    tehsil?: string;
    village?: string;
    postcode?: string;
    road?: string;
    display_name?: string;
  };
  environmental?: {
    soil_moisture?: string;
    soil_temperature?: number;
    temperature?: number;
    humidity?: number;
    surface_pressure?: number;
  };
  lulc_context?: string;
  bhuvan_lulc?: {
    success: boolean;
    available: boolean;
    message?: string | null;
    source?: string | null;
    dataset?: string | null;
    year?: string;
    district?: string | null;
    lulc_code?: number | null;
    class_name?: string | null;
    sub_class?: string | null;
  };
}

export interface DigitalTwinDossier {
  parcel_id: string; // Internal Application Identifier (e.g. GW-012)
  ulpin?: string | null; // Official 14-digit Bhu-Aadhaar (NULL if unavailable from connected source)
  data_status?: ParcelDataStatus;
  land_category: string;
  area_ha: number;
  area_bigha: number;
  area_sq_m: number;
  current_land_use: LandUseType;
  historical_land_use: HistoricalLandUseItem[];
  location: {
    khasra_no: string;
    khata_number: string;
    cadastral_sheet: string;
    village: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
    coordinates_dms: string;
    centroid: [number, number];
  };
  soil_environmental_indicators: SoilEnvironmentalIndicators;
  nearby_infrastructure: NearbyInfrastructureItem[];
  satellite_observations: SatelliteObservationData;
  change_history: ChangeHistoryItem[];
  relevant_research: ResearchCitation[];
  policy_scenarios: PolicyScenario[];
  bhuvan_lulc_classification?: Record<BhuvanLulcPeriod, string>;
}

export type LandRecordStatus = 'VERIFIED' | 'UNDER REVIEW' | 'DISPUTED' | 'PENDING UPDATE';

export type TimelineYear = 2022 | 2024 | 2026;

export interface ParcelTimelineState {
  year?: TimelineYear;
  land_use: LandUseType;
  bhuvan_lulc?: string;
  ndvi: number;
  built_up_percent?: number;
  built_up_pct?: number;
  has_change?: boolean;
  change_desc?: string;
  change_status?: string;
  verification_status?: string;
  observation_date?: string;
}

export interface PolicyImpactData {
  baseline_use: string;
  baseline_regional_loss: string;
  scenario_name: string;
  scenario_use: string;
  scenario_regional_loss: string;
  impact_summary: string;
  is_affected: boolean;
}

export interface ParcelProperties {
  parcel_id: string; // Internal Application Identifier (e.g. GW-012)
  ulpin?: string | null; // Official 14-digit Bhu-Aadhaar (NULL if unavailable)
  data_status?: ParcelDataStatus;
  land_use: LandUseType;
  area: string;
  area_bigha?: string;
  district: string;
  tehsil: string;
  village: string;
  khasra_no: string;
  title_status: 'Verified' | 'Disputed' | 'Under Mutation' | 'Clear Title' | 'Not available from connected source';
  owner_category?: string;

  // Source attribution metadata
  khasra_source?: string;
  area_source?: string;
  land_record_source?: string;

  // Layer 5: Land Record Status
  land_record_status?: LandRecordStatus;
  compensation_status?: string;
  dispute_status?: string;
  last_updated_record?: string;

  // Layer 6: Change Detection & Remote Sensing
  change_type: string;
  change_percentage: string;
  confidence: string;
  priority: PriorityLevel;
  verification_status: 'Pending Verification' | 'Field Verified' | 'Potential Change Detected' | 'Clean';
  previous_state?: string;
  detected_state?: string;
  observation_date?: string;
  vegetation_index?: number;
  built_up_percent?: number;
  detected_date?: string;
  satellite_pass?: string;
  ndvi_score?: number;
  soil_moisture?: string;
  centroid: [number, number];

  // Layer 3: Bhuvan LULC (Official ISRO 1:50K cycles)
  bhuvan_lulc_2005_06?: string;
  bhuvan_lulc_2011_12?: string;
  bhuvan_lulc_2015_16?: string;

  // Layer 7: Policy Simulation
  policy_impact?: PolicyImpactData;

  // Digital Twin Observation Timeline (2022, 2024, 2026)
  timeline_states?: Partial<Record<TimelineYear, ParcelTimelineState>>;
}

export interface PolicySimulationParams {
  landProtectionLevel: 'Strict' | 'Standard' | 'Relaxed';
  urbanExpansionControl: 'Buffer Enforced' | 'Standard Zoning' | 'High Growth';
  compensationEfficiency: '90-Day Accelerated' | 'Standard SLA' | 'Delayed';
}

export interface PolicySimulationResults {
  agriculturalLossPct: number; // e.g. 5.9% vs baseline 8.4%
  disputedParcelsCount: number; // e.g. 241 vs baseline 327
  pendingCompensationCount: number; // e.g. 890 vs baseline 1240
}

export interface ParcelFeature {
  type: 'Feature';
  properties: ParcelProperties;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface ParcelFeatureCollection {
  type: 'FeatureCollection';
  features: ParcelFeature[];
}

export interface LayerVisibilityState {
  satellite: boolean;
  terrain: boolean;
  parcelBoundaries: boolean;
  bhuvanLulc: boolean;
  landRecordStatus: boolean;
  changeDetection: boolean;
  policyImpact: boolean;
  bhuvanPeriod: BhuvanLulcPeriod;
  bhuvanOpacity: number;
}

export interface MapTelemetry {
  lat: number;
  lng: number;
  zoom: number;
  pitch: number;
  bearing: number;
  elevation: number;
}

export type GeographicInspectionLevel = 'country' | 'state' | 'district' | 'local';

export interface GeographicInspectionRequest {
  lat: number;
  lng: number;
  level?: GeographicInspectionLevel;
}

// Enterprise PostgreSQL + PostGIS Domain Model Mappings
export interface DbParcelRecord {
  parcel_id: string; // Primary Key
  ulpin: string | null; // UNIQUE, NULL if unavailable
  geom_wkt: string; // Polygon geometry in EPSG:4326
  centroid_wkt: string; // Point in EPSG:4326
  area_sq_m: number | null; // Calculated via ST_Area(geom::geography)
  area_ha: number | null;
  state_code: string;
  district: string;
  tehsil: string | null;
  village: string | null;
  khasra_no: string | null;
  data_status: string;
  source_dataset: string;
  created_at: string;
}

export interface DbLandRecord {
  record_id: number;
  parcel_id: string;
  khasra_no: string | null;
  recorded_land_use: string | null;
  record_status: string;
  source_authority: string;
  last_updated: string | null;
}

export interface DbSatelliteImageRecord {
  image_id: number;
  sensor: string;
  acquisition_date: string | null;
  resolution_meters: number;
  cloud_cover_pct: number | null;
  source: string;
}

export interface DbObservationRecord {
  observation_id: number;
  parcel_id: string;
  image_id: number;
  ndvi_score: number | null;
  observation_date: string;
}
