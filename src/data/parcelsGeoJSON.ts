import type { ParcelFeatureCollection } from '../types/parcel';

export const parcelsGeoJSONData: ParcelFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-011",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Agriculture",
        area: "3.4 ha (Prototype reference)",
        area_bigha: "13.6 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Morar Rural",
        khasra_no: "138/1 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Private Freehold (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "VERIFIED",
        compensation_status: "None",
        dispute_status: "None",
        last_updated_record: "15 Aug 2026",
        change_type: "None Detected",
        change_percentage: "0%",
        confidence: "97%",
        priority: "NONE",
        verification_status: "Clean",
        detected_date: "04 Sep 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.72,
        vegetation_index: 0.72,
        built_up_percent: 0,
        soil_moisture: "Optimal (Model-derived)",
        centroid: [78.2235, 26.2215],
        bhuvan_lulc_2005_06: "Agriculture",
        bhuvan_lulc_2011_12: "Agriculture",
        bhuvan_lulc_2015_16: "Agriculture",
        policy_impact: {
          baseline_use: "Agriculture",
          baseline_regional_loss: "8.4%",
          scenario_name: "Master Plan 2035 Protection",
          scenario_use: "Protected Prime Agriculture",
          scenario_regional_loss: "5.9%",
          impact_summary: "Zero conversion permit; canal protection zone applied.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.75, built_up_percent: 0, has_change: false, change_desc: "Double-Cropped Kharif/Rabi", verification_status: "Clean" },
          2024: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.74, built_up_percent: 0, has_change: false, change_desc: "Canal-fed Wheat Cultivation", verification_status: "Clean" },
          2026: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.72, built_up_percent: 0, has_change: false, change_desc: "Optimal Agriculture Canopy", verification_status: "Clean" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2218, 26.2202],
            [78.2251, 26.2204],
            [78.2253, 26.2227],
            [78.2219, 26.2229],
            [78.2218, 26.2202]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-012",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Agriculture",
        area: "2.8 ha (Prototype reference)",
        area_bigha: "11.2 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Morar Rural",
        khasra_no: "142/2 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Private Agricultural (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "VERIFIED",
        compensation_status: "Pending",
        dispute_status: "None",
        last_updated_record: "20 Aug 2026",
        change_type: "Agriculture → Potential Built-up Expansion",
        change_percentage: "25%",
        confidence: "93%",
        priority: "HIGH",
        verification_status: "Pending Verification",
        previous_state: "Agriculture",
        detected_state: "Built-up",
        observation_date: "20 Aug 2026",
        vegetation_index: 0.61,
        built_up_percent: 12,
        detected_date: "20 Aug 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.61,
        soil_moisture: "Depleted (Model-derived)",
        centroid: [78.2280, 26.2235],
        bhuvan_lulc_2005_06: "Agriculture",
        bhuvan_lulc_2011_12: "Agriculture",
        bhuvan_lulc_2015_16: "Agriculture",
        policy_impact: {
          baseline_use: "Agriculture",
          baseline_regional_loss: "8.4%",
          scenario_name: "Green Buffer Enforcement",
          scenario_use: "Protected Agriculture",
          scenario_regional_loss: "5.9%",
          impact_summary: "Reduced conversion risk; regional agricultural loss drops from 8.4% to 5.9%.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.76, built_up_percent: 0, has_change: false, change_desc: "Pristine Cropland (Mustard/Gram)", verification_status: "Clean" },
          2024: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.68, built_up_percent: 4, has_change: false, change_desc: "Soil levelling & boundary demarcation", verification_status: "Under Observation" },
          2026: { land_use: "Agriculture", bhuvan_lulc: "Built-up", ndvi: 0.61, built_up_percent: 12, has_change: true, change_desc: "Potential Built-up Expansion (Commercial Plinth)", verification_status: "Pending Verification" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2260, 26.2221],
            [78.2298, 26.2224],
            [78.2301, 26.2248],
            [78.2262, 26.2249],
            [78.2260, 26.2221]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-013",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Vacant",
        area: "1.9 ha (Prototype reference)",
        area_bigha: "7.6 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Sunarpura",
        khasra_no: "89/1 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Gram Panchayat Commercial (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "UNDER REVIEW",
        compensation_status: "Under Assessment",
        dispute_status: "Boundary Rectification Pending",
        last_updated_record: "18 Aug 2026",
        change_type: "Vacant → Plotted Layout",
        change_percentage: "40%",
        confidence: "88%",
        priority: "MEDIUM",
        verification_status: "Potential Change Detected",
        previous_state: "Vacant Scrub",
        detected_state: "Plotted Development",
        observation_date: "18 Aug 2026",
        vegetation_index: 0.22,
        built_up_percent: 8,
        detected_date: "29 Aug 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.18,
        soil_moisture: "Dry Subsoil (Model-derived)",
        centroid: [78.2335, 26.2255],
        bhuvan_lulc_2005_06: "Wasteland",
        bhuvan_lulc_2011_12: "Wasteland",
        bhuvan_lulc_2015_16: "Wasteland",
        policy_impact: {
          baseline_use: "Vacant",
          baseline_regional_loss: "8.4%",
          scenario_name: "Gram Panchayat Regularization",
          scenario_use: "Public Utility & Community Green",
          scenario_regional_loss: "5.9%",
          impact_summary: "Allocated for village school and water percolation park.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Vacant", bhuvan_lulc: "Wasteland", ndvi: 0.25, built_up_percent: 0, has_change: false, change_desc: "Fallow scrub", verification_status: "Clean" },
          2024: { land_use: "Vacant", bhuvan_lulc: "Wasteland", ndvi: 0.20, built_up_percent: 2, has_change: false, change_desc: "Access dirt track created", verification_status: "Clean" },
          2026: { land_use: "Vacant", bhuvan_lulc: "Built-up", ndvi: 0.18, built_up_percent: 8, has_change: true, change_desc: "Unapproved plotting lines flagged", verification_status: "Potential Change Detected" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2315, 26.2242],
            [78.2355, 26.2245],
            [78.2356, 26.2268],
            [78.2317, 26.2269],
            [78.2315, 26.2242]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-014",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Agriculture",
        area: "4.2 ha (Prototype reference)",
        area_bigha: "16.8 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Sunarpura",
        khasra_no: "104/3 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Private Freehold (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "VERIFIED",
        compensation_status: "None",
        dispute_status: "None",
        last_updated_record: "12 Aug 2026",
        change_type: "None Detected",
        change_percentage: "0%",
        confidence: "98%",
        priority: "NONE",
        verification_status: "Clean",
        detected_date: "04 Sep 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.69,
        vegetation_index: 0.69,
        built_up_percent: 0,
        soil_moisture: "Good (Model-derived)",
        centroid: [78.2380, 26.2270],
        bhuvan_lulc_2005_06: "Agriculture",
        bhuvan_lulc_2011_12: "Agriculture",
        bhuvan_lulc_2015_16: "Agriculture",
        policy_impact: {
          baseline_use: "Agriculture",
          baseline_regional_loss: "8.4%",
          scenario_name: "Prime Agro-Cluster Protection",
          scenario_use: "Organic Agri-corridor",
          scenario_regional_loss: "5.9%",
          impact_summary: "High fertility zone protected under Section 172 restrictions.",
          is_affected: false,
        },
        timeline_states: {
          2022: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.71, built_up_percent: 0, has_change: false, change_desc: "Wheat / Mustard", verification_status: "Clean" },
          2024: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.70, built_up_percent: 0, has_change: false, change_desc: "Paddy crop cycle", verification_status: "Clean" },
          2026: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.69, built_up_percent: 0, has_change: false, change_desc: "Stable agricultural use", verification_status: "Clean" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2360, 26.2255],
            [78.2402, 26.2258],
            [78.2405, 26.2284],
            [78.2363, 26.2282],
            [78.2360, 26.2255]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-015",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Built-up",
        area: "0.8 ha (Prototype reference)",
        area_bigha: "3.2 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Morar Cantt Fringe",
        khasra_no: "45/1 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Commercial Roadside (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "DISPUTED",
        compensation_status: "Stay Order Issued by SDM",
        dispute_status: "Civil Suit #114/2024 (Encroachment on PWD Right-of-Way)",
        last_updated_record: "08 Aug 2026",
        change_type: "Commercial Expansion on Highway Fringe",
        change_percentage: "32%",
        confidence: "91%",
        priority: "HIGH",
        verification_status: "Field Verified",
        previous_state: "Highway Fallow",
        detected_state: "Commercial Warehouse",
        observation_date: "14 Aug 2026",
        vegetation_index: 0.12,
        built_up_percent: 68,
        detected_date: "14 Aug 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.12,
        soil_moisture: "Impervious Concrete (Model-derived)",
        centroid: [78.2175, 26.2275],
        bhuvan_lulc_2005_06: "Agriculture",
        bhuvan_lulc_2011_12: "Built-up",
        bhuvan_lulc_2015_16: "Built-up",
        policy_impact: {
          baseline_use: "Built-up",
          baseline_regional_loss: "8.4%",
          scenario_name: "Highway Buffer Demolition & Setback",
          scenario_use: "Regulated Transportation Buffer",
          scenario_regional_loss: "5.9%",
          impact_summary: "30m mandatory arterial setback enforced.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Built-up", bhuvan_lulc: "Built-up", ndvi: 0.22, built_up_percent: 30, has_change: false, change_desc: "Small roadside structure", verification_status: "Clean" },
          2024: { land_use: "Built-up", bhuvan_lulc: "Built-up", ndvi: 0.16, built_up_percent: 48, has_change: true, change_desc: "Shed expansion toward highway", verification_status: "Notice Issued" },
          2026: { land_use: "Built-up", bhuvan_lulc: "Built-up", ndvi: 0.12, built_up_percent: 68, has_change: true, change_desc: "Commercial expansion in dispute", verification_status: "Field Verified" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2155, 26.2265],
            [78.2195, 26.2267],
            [78.2196, 26.2286],
            [78.2157, 26.2285],
            [78.2155, 26.2265]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-016",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Water",
        area: "2.3 ha (Prototype reference)",
        area_bigha: "9.2 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Mehra Talab",
        khasra_no: "312 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "State Water Resources (Talab - Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "PENDING UPDATE",
        compensation_status: "Government Protected Waterbody",
        dispute_status: "None",
        last_updated_record: "01 Aug 2026",
        change_type: "Water → Soil Filling / Encroachment",
        change_percentage: "32%",
        confidence: "91%",
        priority: "HIGH",
        verification_status: "Potential Change Detected",
        previous_state: "Full Wetland Extent",
        detected_state: "Soil Filling Encroachment",
        observation_date: "22 Aug 2026",
        vegetation_index: 0.45,
        built_up_percent: 15,
        detected_date: "22 Aug 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.45,
        soil_moisture: "Saturated Wetland (Model-derived)",
        centroid: [78.2325, 26.2190],
        bhuvan_lulc_2005_06: "Water",
        bhuvan_lulc_2011_12: "Water",
        bhuvan_lulc_2015_16: "Water",
        policy_impact: {
          baseline_use: "Water",
          baseline_regional_loss: "8.4%",
          scenario_name: "Talab Preservation Order",
          scenario_use: "State Wetland Protected Zone",
          scenario_regional_loss: "5.9%",
          impact_summary: "Catchment buffer restored; encroachment removed.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Water", bhuvan_lulc: "Water", ndvi: -0.45, built_up_percent: 0, has_change: false, change_desc: "Pristine reservoir water sheet", verification_status: "Clean" },
          2024: { land_use: "Water", bhuvan_lulc: "Water", ndvi: -0.30, built_up_percent: 5, has_change: false, change_desc: "Debris dumping on edge", verification_status: "Clean" },
          2026: { land_use: "Water", bhuvan_lulc: "Water", ndvi: 0.45, built_up_percent: 15, has_change: true, change_desc: "Active soil filling / wetland loss", verification_status: "Potential Change Detected" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2305, 26.2175],
            [78.2346, 26.2178],
            [78.2348, 26.2205],
            [78.2306, 26.2204],
            [78.2305, 26.2175]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-017",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Agriculture",
        area: "3.1 ha (Prototype reference)",
        area_bigha: "12.4 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Sunarpura East",
        khasra_no: "194/2 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Private Agriculture (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "VERIFIED",
        compensation_status: "None",
        dispute_status: "None",
        last_updated_record: "08 Aug 2026",
        change_type: "None Detected",
        change_percentage: "0%",
        confidence: "98%",
        priority: "NONE",
        verification_status: "Clean",
        detected_date: "08 Sep 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.76,
        vegetation_index: 0.76,
        built_up_percent: 0,
        soil_moisture: "Good (Model-derived)",
        centroid: [78.2395, 26.2215],
        bhuvan_lulc_2005_06: "Agriculture",
        bhuvan_lulc_2011_12: "Agriculture",
        bhuvan_lulc_2015_16: "Agriculture",
        policy_impact: {
          baseline_use: "Agriculture",
          baseline_regional_loss: "8.4%",
          scenario_name: "Prime Agro-Cluster Protection",
          scenario_use: "Protected Agriculture Zone",
          scenario_regional_loss: "5.9%",
          impact_summary: "High fertility zone protected under Section 172 restrictions.",
          is_affected: false,
        },
        timeline_states: {
          2022: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.78, built_up_percent: 0, has_change: false, change_desc: "Mustard crop", verification_status: "Clean" },
          2024: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.77, built_up_percent: 0, has_change: false, change_desc: "Wheat harvest", verification_status: "Clean" },
          2026: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.76, built_up_percent: 0, has_change: false, change_desc: "Continuous arable farming", verification_status: "Clean" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2372, 26.2202],
            [78.2418, 26.2204],
            [78.2420, 26.2229],
            [78.2374, 26.2228],
            [78.2372, 26.2202]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-018",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Forest",
        area: "5.6 ha (Prototype reference)",
        area_bigha: "22.4 Bigha",
        district: "Gwalior",
        tehsil: "Gird",
        village: "Gwalior Fort Ridge North",
        khasra_no: "501/RF (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Reserved Forest Buffer (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "UNDER REVIEW",
        compensation_status: "Forest Department Jurisdiction",
        dispute_status: "Boundary Demarcation with Municipal Corporation",
        last_updated_record: "14 Aug 2026",
        change_type: "Forest → Canopy Thinning",
        change_percentage: "18%",
        confidence: "85%",
        priority: "MEDIUM",
        verification_status: "Potential Change Detected",
        previous_state: "Dense Scrub Forest",
        detected_state: "Canopy Thinning & Scrub Removal",
        observation_date: "14 Aug 2026",
        vegetation_index: 0.52,
        built_up_percent: 0,
        detected_date: "14 Aug 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.52,
        soil_moisture: "Rocky-Moderate (Model-derived)",
        centroid: [78.1720, 26.2425],
        bhuvan_lulc_2005_06: "Forest",
        bhuvan_lulc_2011_12: "Forest",
        bhuvan_lulc_2015_16: "Forest",
        policy_impact: {
          baseline_use: "Forest",
          baseline_regional_loss: "8.4%",
          scenario_name: "Fort Ridge Biosphere Preservation",
          scenario_use: "Strict Forest Sanctuary Zone",
          scenario_regional_loss: "5.9%",
          impact_summary: "Eco-sensitive zone buffer 100m designated around fort base.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Forest", bhuvan_lulc: "Forest", ndvi: 0.62, built_up_percent: 0, has_change: false, change_desc: "Healthy native scrub canopy", verification_status: "Clean" },
          2024: { land_use: "Forest", bhuvan_lulc: "Forest", ndvi: 0.59, built_up_percent: 0, has_change: false, change_desc: "Dry scrub season", verification_status: "Clean" },
          2026: { land_use: "Forest", bhuvan_lulc: "Forest", ndvi: 0.52, built_up_percent: 0, has_change: true, change_desc: "Canopy thinning along lower trail", verification_status: "Potential Change Detected" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.1690, 26.2395],
            [78.1752, 26.2405],
            [78.1756, 26.2450],
            [78.1692, 26.2445],
            [78.1690, 26.2395]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-019",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Built-up",
        area: "1.7 ha (Prototype reference)",
        area_bigha: "6.8 Bigha",
        district: "Gwalior",
        tehsil: "Gwalior City",
        village: "Maharaj Bada Sector",
        khasra_no: "77/1 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Commercial Mixed (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "DISPUTED",
        compensation_status: "None",
        dispute_status: "Civil Suit #204/2025 (Title ownership dispute)",
        last_updated_record: "10 Aug 2026",
        change_type: "Unauthorized Vertical Expansion",
        change_percentage: "15%",
        confidence: "89%",
        priority: "MEDIUM",
        verification_status: "Pending Verification",
        previous_state: "G+1 Commercial",
        detected_state: "G+4 Structural Frame",
        observation_date: "10 Aug 2026",
        vegetation_index: 0.08,
        built_up_percent: 85,
        detected_date: "10 Aug 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.08,
        soil_moisture: "Paved (Model-derived)",
        centroid: [78.1810, 26.2130],
        bhuvan_lulc_2005_06: "Built-up",
        bhuvan_lulc_2011_12: "Built-up",
        bhuvan_lulc_2015_16: "Built-up",
        policy_impact: {
          baseline_use: "Built-up",
          baseline_regional_loss: "8.4%",
          scenario_name: "Heritage FAR Enforcement",
          scenario_use: "Heritage Commercial Zone",
          scenario_regional_loss: "5.9%",
          impact_summary: "FAR capped at 1.5; upper unauthorized floors sealed.",
          is_affected: true,
        },
        timeline_states: {
          2022: { land_use: "Built-up", bhuvan_lulc: "Built-up", ndvi: 0.10, built_up_percent: 70, has_change: false, change_desc: "Ground + 1 Floor commercial store", verification_status: "Clean" },
          2024: { land_use: "Built-up", bhuvan_lulc: "Built-up", ndvi: 0.09, built_up_percent: 75, has_change: false, change_desc: "Pillar casting activity", verification_status: "Clean" },
          2026: { land_use: "Built-up", bhuvan_lulc: "Built-up", ndvi: 0.08, built_up_percent: 85, has_change: true, change_desc: "Unauthorized vertical floor expansion", verification_status: "Pending Verification" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.1790, 26.2118],
            [78.1832, 26.2120],
            [78.1834, 26.2142],
            [78.1792, 26.2141],
            [78.1790, 26.2118]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        parcel_id: "GW-020",
        ulpin: null,
        data_status: "Prototype / Synthetic Placeholder",
        land_use: "Agriculture",
        area: "2.5 ha (Prototype reference)",
        area_bigha: "10.0 Bigha",
        district: "Gwalior",
        tehsil: "Morar",
        village: "Girwai Khurd",
        khasra_no: "220/1 (Prototype reference)",
        title_status: "Not available from connected source",
        owner_category: "Private Agricultural (Prototype)",
        khasra_source: "Prototype Reference (Awaiting Authoritative Cadastral Link)",
        area_source: "Prototype Reference",
        land_record_source: "Bhu-Manthan Study Area Prototype (Gwalior, MP)",
        land_record_status: "PENDING UPDATE",
        compensation_status: "Approved for Canal Siphon",
        dispute_status: "Mutation in Process",
        last_updated_record: "25 Aug 2026",
        change_type: "None Detected",
        change_percentage: "0%",
        confidence: "96%",
        priority: "NONE",
        verification_status: "Clean",
        detected_date: "05 Sep 2026",
        satellite_pass: "Sentinel-2 MSI",
        ndvi_score: 0.74,
        vegetation_index: 0.74,
        built_up_percent: 0,
        soil_moisture: "Adequate (Model-derived)",
        centroid: [78.2435, 26.2300],
        bhuvan_lulc_2005_06: "Agriculture",
        bhuvan_lulc_2011_12: "Agriculture",
        bhuvan_lulc_2015_16: "Agriculture",
        policy_impact: {
          baseline_use: "Agriculture",
          baseline_regional_loss: "8.4%",
          scenario_name: "Canal Green Buffer Zone",
          scenario_use: "Protected Agricultural Commons",
          scenario_regional_loss: "5.9%",
          impact_summary: "Guaranteed irrigation subsidy under canal modernization scheme.",
          is_affected: false,
        },
        timeline_states: {
          2022: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.76, built_up_percent: 0, has_change: false, change_desc: "Paddy crop", verification_status: "Clean" },
          2024: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.75, built_up_percent: 0, has_change: false, change_desc: "Canal irrigated", verification_status: "Clean" },
          2026: { land_use: "Agriculture", bhuvan_lulc: "Agriculture", ndvi: 0.74, built_up_percent: 0, has_change: false, change_desc: "Clean agricultural parcel", verification_status: "Clean" }
        }
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [78.2415, 26.2288],
            [78.2458, 26.2290],
            [78.2460, 26.2315],
            [78.2418, 26.2314],
            [78.2415, 26.2288]
          ]
        ]
      }
    }
  ]
};
