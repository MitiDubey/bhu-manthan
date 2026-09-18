import type { DigitalTwinDossier } from '../types/parcel';

export const parcelsMetadata: { parcels: DigitalTwinDossier[] } = {
  parcels: [
    {
      parcel_id: "GW-011",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Private Agricultural Freehold (Prototype)",
      area_ha: 3.4,
      area_bigha: 13.6,
      area_sq_m: 34000,
      current_land_use: "Agriculture",
      historical_land_use: [
        { year: 2016, use: "Intensive Double-Cropped Agriculture", source: "Landsat-8 OLI", notes: "Wheat / Mustard rotation" },
        { year: 2020, use: "Agriculture (Canal-Fed)", source: "Sentinel-2 MSI", notes: "High NDVI vigor index 0.78" },
        { year: 2024, use: "Agriculture", source: "Sentinel-2 MSI", notes: "No non-agricultural footprint" },
        { year: 2026, use: "Agriculture", source: "Sentinel-2 MSI", notes: "Current active crop season" }
      ],
      location: {
        khasra_no: "138/1 (Prototype reference)",
        khata_number: "KT-8842",
        cadastral_sheet: "SH-MOR-04",
        village: "Morar Rural",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'17.4\"N 78°13'24.6\"E",
        centroid: [78.2235, 26.2215]
      },
      soil_environmental_indicators: {
        soil_type: "Deep Alluvial Loam (Chambal Basin Inceptisol)",
        soil_ph: 7.4,
        organic_carbon_percent: 0.62,
        soil_moisture_regime: "Udic / Canal Sub-irrigation (Model-derived)",
        ndvi_current: 0.72,
        ndvi_baseline: 0.75,
        land_degradation_risk: "LOW",
        groundwater_table_depth: "14.2 m bgl (Safe Zone)",
        flood_drainage_vulnerability: "Low (Natural eastward gentle gradient)"
      },
      nearby_infrastructure: [
        { name: "Morar Branch Irrigation Canal", category: "Canal", distance_km: 0.45, governance_impact: "Perennial water access, mandatory 50m buffer" },
        { name: "NH-44 (North-South Corridor)", category: "Highway", distance_km: 2.8, governance_impact: "Logistics access, secondary feeder connectivity" },
        { name: "Morar 33kV Substation", category: "Power", distance_km: 1.6, governance_impact: "Dedicated agricultural feeder line" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-09-04T05:22:18Z",
        cloud_cover_percent: 1.2,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8 (VNIR) & B11 (SWIR)",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-09-04", event: "Routine Sentinel-2 Pass", affected_area_ha: 0, affected_area_percent: 0, detected_by: "Bhu-Vision Automated Audit", confidence_score: 97, action_status: "Clean" },
        { date: "2025-11-12", event: "Post-Monsoon Kharif Audit", affected_area_ha: 0, affected_area_percent: 0, detected_by: "SAC/ISRO Bhuvan Sync", confidence_score: 98, action_status: "Clean" }
      ],
      relevant_research: [
        { title: "Soil Health & Land Use Dynamics in Gwalior District", source_institution: "ICAR-NBSS&LUP", year: 2023, key_finding: "Alluvial plains retain prime arable classification with high nutrient capacity." },
        { title: "Monitoring Agricultural Shifts using Sentinel-2", source_institution: "Journal of the Indian Society of Remote Sensing", year: 2024, key_finding: "Multi-temporal NDVI tracking detects crop rotation consistency with 94% accuracy." }
      ],
      policy_scenarios: [
        { scenario_name: "Master Plan 2035: Agricultural Protection Zone", zoning_status: "Prime Agricultural Reservation", projected_runoff_change: "0% (Permeable soils maintained)", heat_island_delta: "0.0°C", revenue_implication: "Standard agricultural cess, eligible for PM-KISAN", recommendation: "Maintain strict non-diversion status." }
      ]
    },
    {
      parcel_id: "GW-012",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Private Agricultural (Under Unsanctioned Conversion - Prototype)",
      area_ha: 2.8,
      area_bigha: 11.2,
      area_sq_m: 28000,
      current_land_use: "Agriculture",
      historical_land_use: [
        { year: 2018, use: "Productive Mustard & Gram Cropland", source: "Landsat-8", notes: "Full vegetation canopy cover (NDVI 0.74)" },
        { year: 2022, use: "Agriculture with Peripheral Fallow", source: "Sentinel-2 MSI", notes: "Signs of boundary fencing and soil stripping" },
        { year: 2025, use: "Transition: Ground Clearing & Levelling", source: "Sentinel-2 MSI", notes: "Soil compaction and preliminary masonry footings" },
        { year: 2026, use: "Built-up Encroachment (Commercial Plinth)", source: "Sentinel-2 MSI", notes: "Concrete sub-base, loss of 0.7 ha productive topsoil" }
      ],
      location: {
        khasra_no: "142/2 (Prototype reference)",
        khata_number: "KT-9104",
        cadastral_sheet: "SH-MOR-07",
        village: "Morar Rural",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'24.6\"N 78°13'40.8\"E",
        centroid: [78.2280, 26.2235]
      },
      soil_environmental_indicators: {
        soil_type: "Sandy Clay Loam (Sub-alluvial)",
        soil_ph: 7.1,
        organic_carbon_percent: 0.41,
        soil_moisture_regime: "Depleted (Model-derived)",
        ndvi_current: 0.38,
        ndvi_baseline: 0.74,
        land_degradation_risk: "CRITICAL",
        groundwater_table_depth: "18.6 m bgl (Declining rate: 0.6 m/yr)",
        flood_drainage_vulnerability: "High (Impermeable concrete runoff into adjacent fields)"
      },
      nearby_infrastructure: [
        { name: "Morar Peri-Urban Arterial Road", category: "Highway", distance_km: 0.18, governance_impact: "Driver of commercial land speculation and unauthorized ribbon development" },
        { name: "Gwalior Maharajpura Airport", category: "Aviation", distance_km: 6.2, governance_impact: "Within Outer Airport Vicinity Obstacle Limitation Surface" },
        { name: "Morar Branch Canal Siphon", category: "Canal", distance_km: 0.75, governance_impact: "Risk of stormwater discharge contamination" },
        { name: "Gwalior Outer Ring Road (Proposed)", category: "Highway", distance_km: 1.2, governance_impact: "High commercial valuation corridor" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-08-18T10:45:00Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8 (10m VNIR) & B11 (SWIR)",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-08-18", event: "AI ChangeNet Flag: Agri → Built-up Detected", affected_area_ha: 0.7, affected_area_percent: 25, detected_by: "Bhu-Vision ResNet-50", confidence_score: 93, action_status: "Pending Verification" },
        { date: "2026-06-04", event: "Spectral Reflectance Shift (Dry Soil to Concrete Signature)", affected_area_ha: 0.45, affected_area_percent: 16, detected_by: "Sentinel-2 Band 11/12 Anomaly", confidence_score: 89, action_status: "Pending Verification" },
        { date: "2025-10-20", event: "Pattadar Mutation Entry Filed", affected_area_ha: 0, affected_area_percent: 0, detected_by: "Bhulekh MP Database", confidence_score: 99, action_status: "Field Notice Issued" }
      ],
      relevant_research: [
        { title: "Peri-Urban Sprawl and Arable Land Loss in Gwalior Agglomeration", source_institution: "ISRO Space Applications Centre (SAC)", year: 2024, key_finding: "Unplanned conversions along Morar corridor increased surface heat signature by 2.1°C and disrupted natural canal drainways." },
        { title: "Statutory Analysis of Section 172 MPLRC Violations", source_institution: "MP Revenue Judicial Review", year: 2025, key_finding: "Over 68% of agricultural conversions along highway fringes lack requisite SDM diversion sanctions." }
      ],
      policy_scenarios: [
        { scenario_name: "Scenario A: Immediate Enforcement & Demolition", zoning_status: "Strict Agricultural Reversion", projected_runoff_change: "-22% (Restores soil infiltration)", heat_island_delta: "-1.4°C", revenue_implication: "₹4.2 Lakh penalty under MPLRC Sec 172; Restoration bond", recommendation: "Issue Form-IV notice; dispatch Patwari drone survey; seal construction site." },
        { scenario_name: "Scenario B: Regularization via Mixed-Use Diversion", zoning_status: "Commercial / Peri-Urban Planned", projected_runoff_change: "+34% (Requires on-site retention tank)", heat_island_delta: "+1.8°C", revenue_implication: "₹18.5 Lakh diversion fee & commercial property tax collection", recommendation: "Mandate rainwater harvesting, 15% green buffer, and Town Planning approval." }
      ]
    },
    {
      parcel_id: "GW-013",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Gram Panchayat Common Pool (Shamlat Deh - Prototype)",
      area_ha: 1.9,
      area_bigha: 7.6,
      area_sq_m: 19000,
      current_land_use: "Vacant",
      historical_land_use: [
        { year: 2017, use: "Village Grazing Ground (Gauchar)", source: "Landsat-8", notes: "Community pasture with scrub vegetation" },
        { year: 2021, use: "Barren Fallow", source: "Sentinel-2 MSI", notes: "Gradual denudation of scrub" },
        { year: 2026, use: "Vacant (Under Unauthorized Demarcation)", source: "Sentinel-2 MSI", notes: "Grid roads demarcated with chalk and stones" }
      ],
      location: {
        khasra_no: "89/1 (Prototype reference)",
        khata_number: "KT-4318",
        cadastral_sheet: "SH-SUN-02",
        village: "Sunarpura",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'31.8\"N 78°14'00.6\"E",
        centroid: [78.2335, 26.2255]
      },
      soil_environmental_indicators: {
        soil_type: "Gravelly Sandy Loam (Ravine Transition)",
        soil_ph: 7.8,
        organic_carbon_percent: 0.28,
        soil_moisture_regime: "Aridic / Rainfed Dry (Model-derived)",
        ndvi_current: 0.18,
        ndvi_baseline: 0.32,
        land_degradation_risk: "HIGH",
        groundwater_table_depth: "22.4 m bgl",
        flood_drainage_vulnerability: "Moderate (Gully erosion prone)"
      },
      nearby_infrastructure: [
        { name: "Sunarpura Village Link Road", category: "Highway", distance_km: 0.12, governance_impact: "Direct access to unapproved plotted layout" },
        { name: "Gwalior Electrical Grid Line 11kV", category: "Power", distance_km: 0.4, governance_impact: "Risk of illegal power tapping" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-08-29T06:12:00Z",
        cloud_cover_percent: 0.5,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8 (10m VNIR)",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-08-29", event: "Plotted Layout Grid Formation Detected", affected_area_ha: 0.76, affected_area_percent: 40, detected_by: "Texture Gradient Segmentation", confidence_score: 88, action_status: "Pending Verification" }
      ],
      relevant_research: [
        { title: "Colonization Pressures on Common Land in North Madhya Pradesh", source_institution: "Centre for Land Governance", year: 2024, key_finding: "Gram Sabha lands on city peripheries face high risk of illegal plotting without layout approval." }
      ],
      policy_scenarios: [
        { scenario_name: "Panchayat Commons Reclamation", zoning_status: "Protected Community Open Space", projected_runoff_change: "-15%", heat_island_delta: "-0.8°C", revenue_implication: "Protection of public asset worth ₹3.8 Cr", recommendation: "Enforce Gram Sabha resolution; establish community solar or afforestation park." }
      ]
    },
    {
      parcel_id: "GW-014",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Private Joint Agricultural Holding (Prototype)",
      area_ha: 4.2,
      area_bigha: 16.8,
      area_sq_m: 42000,
      current_land_use: "Agriculture",
      historical_land_use: [
        { year: 2015, use: "Double-Cropped Wheat & Paddy", source: "Landsat-8 OLI", notes: "Consistently irrigated" },
        { year: 2020, use: "Agriculture", source: "Sentinel-2 MSI", notes: "NDVI peak 0.84" },
        { year: 2026, use: "Agriculture", source: "Sentinel-2 MSI", notes: "Prime agricultural cultivation" }
      ],
      location: {
        khasra_no: "205/3 (Prototype reference)",
        khata_number: "KT-1102",
        cadastral_sheet: "SH-BAR-01",
        village: "Baraua",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°12'57.6\"N 78°13'26.4\"E",
        centroid: [78.2240, 26.2160]
      },
      soil_environmental_indicators: {
        soil_type: "Fertile Alluvial Clay Loam",
        soil_ph: 7.6,
        organic_carbon_percent: 0.71,
        soil_moisture_regime: "Perennial Sub-surface Hydration (Model-derived)",
        ndvi_current: 0.81,
        ndvi_baseline: 0.80,
        land_degradation_risk: "LOW",
        groundwater_table_depth: "12.8 m bgl",
        flood_drainage_vulnerability: "Low"
      },
      nearby_infrastructure: [
        { name: "Baraua Minor Canal", category: "Canal", distance_km: 0.2, governance_impact: "Primary irrigation lifeline" },
        { name: "Agri-Warehouse & Cold Storage Hub", category: "Urban Center", distance_km: 3.4, governance_impact: "Farm-gate market linkage" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-09-06T05:22:15Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8, B11",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-09-06", event: "Crop Acreage Verification", affected_area_ha: 0, affected_area_percent: 0, detected_by: "FASAL Crop Model", confidence_score: 99, action_status: "Clean" }
      ],
      relevant_research: [
        { title: "Precision Agriculture Mapping in Chambal Basin", source_institution: "ICAR-CIAE", year: 2024, key_finding: "Baraua belt maintains highest water productivity index in Morar tehsil." }
      ],
      policy_scenarios: [
        { scenario_name: "PM-KISAN & Precision Subsidy Corridor", zoning_status: "Agricultural Green Zone", projected_runoff_change: "0%", heat_island_delta: "-0.5°C", revenue_implication: "Eligible for micro-irrigation subventions", recommendation: "Incentivize organic horticulture and drip irrigation." }
      ]
    },
    {
      parcel_id: "GW-015",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Municipal Abadi (Residential / Urban Settlement - Prototype)",
      area_ha: 1.1,
      area_bigha: 4.4,
      area_sq_m: 11000,
      current_land_use: "Built-up",
      historical_land_use: [
        { year: 2016, use: "Urban Village Core", source: "Landsat-8", notes: "Dense residential cluster" },
        { year: 2026, use: "Established Abadi Settlement", source: "Sentinel-2 MSI", notes: "Stable multi-story residential housing" }
      ],
      location: {
        khasra_no: "44/A (Prototype reference)",
        khata_number: "KT-0932",
        cadastral_sheet: "SH-MOR-01",
        village: "Morar Cantt Fringe",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'39.0\"N 78°13'03.0\"E",
        centroid: [78.2175, 26.2275]
      },
      soil_environmental_indicators: {
        soil_type: "Constructed Urban Soil (Paved Sub-base)",
        soil_ph: 8.0,
        organic_carbon_percent: 0.15,
        soil_moisture_regime: "Impermeable (Model-derived)",
        ndvi_current: 0.12,
        ndvi_baseline: 0.14,
        land_degradation_risk: "MODERATE",
        groundwater_table_depth: "24.5 m bgl",
        flood_drainage_vulnerability: "Moderate (Urban stormwater ponding during monsoon)"
      },
      nearby_infrastructure: [
        { name: "Morar Cantonment Hospital", category: "Urban Center", distance_km: 0.8, governance_impact: "Public healthcare coverage" },
        { name: "Gwalior City Bus Route 4", category: "Highway", distance_km: 0.25, governance_impact: "Public transit connectivity" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-09-01T08:20:00Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8 (10m VNIR)",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-09-01", event: "Settlement Density Verification", affected_area_ha: 0, affected_area_percent: 0, detected_by: "Urban Building Footprint Extraction", confidence_score: 95, action_status: "Clean" }
      ],
      relevant_research: [
        { title: "Urban Heat Island Characterization in Gwalior Core", source_institution: "IIT Roorkee Geospatial Dept", year: 2023, key_finding: "Built-up surfaces exhibit 3.2°C higher nocturnal thermal retention." }
      ],
      policy_scenarios: [
        { scenario_name: "Smart City Property Tax Optimization", zoning_status: "Settlement Municipal Zone", projected_runoff_change: "0%", heat_island_delta: "0.0°C", revenue_implication: "Property tax yield ₹8.4 Lakh/year", recommendation: "Enforce rooftop solar installations and percolation pits." }
      ]
    },
    {
      parcel_id: "GW-016",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "State Water Resources Protection Area (Talab - Prototype)",
      area_ha: 2.3,
      area_bigha: 9.2,
      area_sq_m: 23000,
      current_land_use: "Water",
      historical_land_use: [
        { year: 2015, use: "Perennial Water Reservoir (Talab)", source: "Landsat-8 NDWI", notes: "Open water spread covering 2.1 ha" },
        { year: 2020, use: "Seasonal Water Catchment", source: "Sentinel-2 MSI", notes: "Aquatic vegetation and boundary silting" },
        { year: 2026, use: "Waterbody Encroachment (Soil Filling)", source: "Sentinel-2 MSI", notes: "Active earthmoving landfilling on western edge" }
      ],
      location: {
        khasra_no: "312 (Prototype reference)",
        khata_number: "KT-0012",
        cadastral_sheet: "SH-MEH-03",
        village: "Mehra Talab",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'08.4\"N 78°13'57.0\"E",
        centroid: [78.2325, 26.2190]
      },
      soil_environmental_indicators: {
        soil_type: "Lacustrine Silt & Hydric Clay",
        soil_ph: 7.2,
        organic_carbon_percent: 1.25,
        soil_moisture_regime: "Hydric / Saturated Wetland",
        ndvi_current: 0.45,
        ndvi_baseline: 0.10,
        land_degradation_risk: "CRITICAL",
        groundwater_table_depth: "2.5 m bgl (Direct aquifer recharge zone)",
        flood_drainage_vulnerability: "High (Buffer zone flood attenuation basin)"
      },
      nearby_infrastructure: [
        { name: "Mehra Catchment Overflow Feeder", category: "Canal", distance_km: 0.1, governance_impact: "Vital regional flood relief conduit" },
        { name: "Morar Bypass Expansion", category: "Highway", distance_km: 0.9, governance_impact: "Source of construction debris dumping" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI & Sentinel-1 SAR GRD",
        resolution_meters: 10,
        last_acquisition_utc: "2026-08-22T05:22:10Z",
        cloud_cover_percent: 2.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "NDWI (B3 - B8)/(B3 + B8) & VV/VH SAR Polarimetry",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-08-22", event: "Water Spread Depletion: 0.73 ha Infilled", affected_area_ha: 0.73, affected_area_percent: 32, detected_by: "SAR Coherence & Optical Water Mask", confidence_score: 91, action_status: "Pending Verification" }
      ],
      relevant_research: [
        { title: "Wetland Conservation & Aquifer Recharge in Central India", source_institution: "Central Ground Water Board (CGWB)", year: 2024, key_finding: "Loss of peri-urban talabs directly correlates with 1.2m/year drop in surrounding tube-well heads." },
        { title: "NGT Compliance Directives for Protected Waterbodies", source_institution: "National Green Tribunal Central Zone", year: 2025, key_finding: "Absolute prohibition on land use conversion or mutation of waterbodies registered in 1950 revenue records." }
      ],
      policy_scenarios: [
        { scenario_name: "Emergency Wetland Restoration & Demarcation", zoning_status: "Statutory Wetland Sanctuary", projected_runoff_change: "+45% water storage capacity", heat_island_delta: "-2.2°C microclimate cooling", revenue_implication: "Penalties on violators under Environment Protection Act 1986", recommendation: "Issue stop-work order immediately; deploy police picket; restore excavated bed." }
      ]
    },
    {
      parcel_id: "GW-017",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Private Agricultural Freehold (Prototype)",
      area_ha: 3.1,
      area_bigha: 12.4,
      area_sq_m: 31000,
      current_land_use: "Agriculture",
      historical_land_use: [
        { year: 2017, use: "Wheat & Mustard Agriculture", source: "Sentinel-2 MSI", notes: "Regular crop rotation" },
        { year: 2026, use: "Active Agriculture", source: "Sentinel-2 MSI", notes: "Healthy crop canopy" }
      ],
      location: {
        khasra_no: "194/2 (Prototype reference)",
        khata_number: "KT-7612",
        cadastral_sheet: "SH-SUN-05",
        village: "Sunarpura East",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'17.4\"N 78°14'22.2\"E",
        centroid: [78.2395, 26.2215]
      },
      soil_environmental_indicators: {
        soil_type: "Alluvial Silty Loam",
        soil_ph: 7.3,
        organic_carbon_percent: 0.68,
        soil_moisture_regime: "Adequate Canal-Fed (Model-derived)",
        ndvi_current: 0.76,
        ndvi_baseline: 0.75,
        land_degradation_risk: "LOW",
        groundwater_table_depth: "15.0 m bgl",
        flood_drainage_vulnerability: "Low"
      },
      nearby_infrastructure: [
        { name: "Sunarpura Irrigation Sub-Canal", category: "Canal", distance_km: 0.35, governance_impact: "Direct water entitlement" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-09-08T05:22:12Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-09-08", event: "Automated Satellite Compliance Scan", affected_area_ha: 0, affected_area_percent: 0, detected_by: "Bhu-Vision", confidence_score: 98, action_status: "Clean" }
      ],
      relevant_research: [
        { title: "Agricultural Soil Fertility Mapping of Gwalior Region", source_institution: "JNKVV Agriculture University", year: 2023, key_finding: "High potassium and available nitrogen index supports sustainable multi-cropping." }
      ],
      policy_scenarios: [
        { scenario_name: "Sustainable Agro-Ecological Corridor", zoning_status: "Protected Agricultural Zone", projected_runoff_change: "0%", heat_island_delta: "-0.4°C", revenue_implication: "Agricultural export subsidy access", recommendation: "Promote solar pump irrigation adoption." }
      ]
    },
    {
      parcel_id: "GW-018",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Reserved Forest Buffer & Heritage Escarpment (Prototype)",
      area_ha: 5.6,
      area_bigha: 22.4,
      area_sq_m: 56000,
      current_land_use: "Forest",
      historical_land_use: [
        { year: 2016, use: "Dense Scrub & Sandstone Ridge Forest", source: "Landsat-8 OLI", notes: "Anogeissus pendula (Dhau) forest canopy" },
        { year: 2021, use: "Degraded Forest Buffer", source: "Sentinel-2 MSI", notes: "Canopy thinning along lower foothills" },
        { year: 2026, use: "Forest (Under Scrub Thinning)", source: "Sentinel-2 MSI", notes: "Canopy opening on north-west face" }
      ],
      location: {
        khasra_no: "501/RF (Prototype reference)",
        khata_number: "KT-0044",
        cadastral_sheet: "SH-FRT-01",
        village: "Gwalior Fort Ridge North",
        tehsil: "Gird",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474001",
        coordinates_dms: "26°14'33.0\"N 78°10'19.2\"E",
        centroid: [78.1720, 26.2425]
      },
      soil_environmental_indicators: {
        soil_type: "Vindhyan Sandstone Skeletal Rocky Soil",
        soil_ph: 6.8,
        organic_carbon_percent: 0.35,
        soil_moisture_regime: "Lithic Dry / High Surface Runoff (Model-derived)",
        ndvi_current: 0.52,
        ndvi_baseline: 0.68,
        land_degradation_risk: "HIGH",
        groundwater_table_depth: "45.0 m bgl (Rocky ridge perched aquifer)",
        flood_drainage_vulnerability: "Flash runoff generator to lower city"
      },
      nearby_infrastructure: [
        { name: "ASI Protected Monument Gwalior Fort", category: "Urban Center", distance_km: 0.5, governance_impact: "Within 300m Regulated Heritage Zone" },
        { name: "Fort Heritage Access Ramp Road", category: "Highway", distance_km: 0.7, governance_impact: "Tourism corridor" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-08-14T05:30:00Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8, B11, B12",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-08-14", event: "Canopy Disturbance: 1.0 ha Thinning Flagged", affected_area_ha: 1.0, affected_area_percent: 18, detected_by: "Forest Canopy Disturbance Index (FCDI)", confidence_score: 85, action_status: "Pending Verification" }
      ],
      relevant_research: [
        { title: "Geomorphological Hazard Assessment of Gwalior Fort Escarpment", source_institution: "Geological Survey of India (GSI)", year: 2024, key_finding: "Vegetation loss on escarpment slopes increases rockfall vulnerability by 40%." },
        { title: "ASI Ancient Monuments and Archaeological Sites and Remains Act", source_institution: "Archaeological Survey of India", year: 2023, key_finding: "Strict ban on mining or construction within 300m of Gwalior Fort wall." }
      ],
      policy_scenarios: [
        { scenario_name: "Eco-Restoration & Bio-Fencing", zoning_status: "ASI Heritage Forest Buffer", projected_runoff_change: "-30% (Native tree root stabilization)", heat_island_delta: "-1.8°C", revenue_implication: "Heritage tourism ecological cess", recommendation: "Deploy drone surveillance team to identify illegal quarry vehicles." }
      ]
    },
    {
      parcel_id: "GW-019",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Commercial Mixed-Use Freehold (Disputed - Prototype)",
      area_ha: 1.7,
      area_bigha: 6.8,
      area_sq_m: 17000,
      current_land_use: "Built-up",
      historical_land_use: [
        { year: 2017, use: "Commercial Warehousing (G+1)", source: "Landsat-8", notes: "Approved FAR 1.2" },
        { year: 2026, use: "Multi-Storey Commercial Retail (G+4)", source: "Sentinel-2 MSI", notes: "Height 18m exceeding FAR sanction" }
      ],
      location: {
        khasra_no: "77/1 (Prototype reference)",
        khata_number: "KT-6219",
        cadastral_sheet: "SH-GWL-09",
        village: "Maharaj Bada Sector",
        tehsil: "Gwalior City",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474001",
        coordinates_dms: "26°12'46.8\"N 78°10'51.6\"E",
        centroid: [78.1810, 26.2130]
      },
      soil_environmental_indicators: {
        soil_type: "Heavy Compacted Sub-grade",
        soil_ph: 8.2,
        organic_carbon_percent: 0.10,
        soil_moisture_regime: "Zero Infiltration (100% Paved - Model-derived)",
        ndvi_current: 0.08,
        ndvi_baseline: 0.09,
        land_degradation_risk: "MODERATE",
        groundwater_table_depth: "28.0 m bgl",
        flood_drainage_vulnerability: "High (Surplus surface runoff into municipal drains)"
      },
      nearby_infrastructure: [
        { name: "Maharaj Bada Heritage Commercial Square", category: "Urban Center", distance_km: 0.4, governance_impact: "Major civic footfall and traffic congestion node" },
        { name: "Gwalior Junction Railway Station", category: "Railway", distance_km: 2.1, governance_impact: "High commercial logistics accessibility" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-08-10T09:40:00Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8, B11, B12",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-08-10", event: "Spectral Signature: Concrete Expansion Detected", affected_area_ha: 0.25, affected_area_percent: 15, detected_by: "Built-up Index Shift", confidence_score: 89, action_status: "Pending Verification" }
      ],
      relevant_research: [
        { title: "Satellite Monitoring for Urban Building Footprints", source_institution: "ISRO SAC", year: 2024, key_finding: "High-resolution Earth observation tracks structural expansion in historic urban cores." }
      ],
      policy_scenarios: [
        { scenario_name: "Municipal FAR Compounding or Sealing", zoning_status: "Commercial Core Zone", projected_runoff_change: "0%", heat_island_delta: "+1.2°C", revenue_implication: "Compounding penalty ₹45 Lakh or partial demolition", recommendation: "Serve notice under MP Municipal Corporation Act Section 307." }
      ]
    },
    {
      parcel_id: "GW-020",
      ulpin: null,
      data_status: "Prototype / Synthetic Placeholder",
      land_category: "Private Agricultural (Partition Under Mutation - Prototype)",
      area_ha: 2.5,
      area_bigha: 10.0,
      area_sq_m: 25000,
      current_land_use: "Agriculture",
      historical_land_use: [
        { year: 2017, use: "Joint Family Agriculture (Mustard/Wheat)", source: "Sentinel-2 MSI", notes: "Single large contiguous boundary" },
        { year: 2026, use: "Partitioned Agriculture Fields", source: "Sentinel-2 MSI", notes: "Sub-division bunds visible, agricultural use maintained" }
      ],
      location: {
        khasra_no: "220/1 (Prototype reference)",
        khata_number: "KT-8109",
        cadastral_sheet: "SH-GIR-04",
        village: "Girwai Khurd",
        tehsil: "Morar",
        district: "Gwalior",
        state: "Madhya Pradesh",
        pincode: "474006",
        coordinates_dms: "26°13'48.0\"N 78°14'36.6\"E",
        centroid: [78.2435, 26.2300]
      },
      soil_environmental_indicators: {
        soil_type: "Alluvial Loamy Sand",
        soil_ph: 7.2,
        organic_carbon_percent: 0.58,
        soil_moisture_regime: "Canal & Borewell Dual Irrigation (Model-derived)",
        ndvi_current: 0.74,
        ndvi_baseline: 0.72,
        land_degradation_risk: "LOW",
        groundwater_table_depth: "16.4 m bgl",
        flood_drainage_vulnerability: "Low"
      },
      nearby_infrastructure: [
        { name: "Girwai Minor Road", category: "Highway", distance_km: 0.3, governance_impact: "Local connectivity" },
        { name: "Morar Canal Tail Feeder", category: "Canal", distance_km: 0.6, governance_impact: "Tail-end water supply" }
      ],
      satellite_observations: {
        primary_sensor: "Sentinel-2 MSI (Level-2A BOA)",
        resolution_meters: 10,
        last_acquisition_utc: "2026-09-05T05:22:18Z",
        cloud_cover_percent: 0.0,
        revisit_cycle_days: 5,
        spectral_bands_used: "B2, B3, B4, B8",
        surface_reflectance_quality: "High"
      },
      change_history: [
        { date: "2026-09-05", event: "Cadastral Partition Sub-bund Verification", affected_area_ha: 0, affected_area_percent: 0, detected_by: "Bhu-Vision Cadastral Boundary Parser", confidence_score: 96, action_status: "Clean" }
      ],
      relevant_research: [
        { title: "Digital Cadastral Mutation Integration in Madhya Pradesh", source_institution: "IIT Bombay & MP Land Records", year: 2024, key_finding: "Automated satellite bund alignment speeds partition mutation resolution by 3.8x." }
      ],
      policy_scenarios: [
        { scenario_name: "Partition Title Finalization", zoning_status: "Agricultural Sub-divided", projected_runoff_change: "0%", heat_island_delta: "0.0°C", revenue_implication: "Mutation fee clearance ₹12,000", recommendation: "Sanction Form-III mutation order in Bhulekh MP." }
      ]
    }
  ]
};
