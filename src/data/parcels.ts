import { Parcel } from '../types';

export const mockParcels: Parcel[] = [
  // 1. VARANASI - SARNATH PARCEL 1 (Agricultural Farmland)
  {
    id: 'parcel-001',
    parcelCode: 'UP-VNS-SRN-0412',
    khasraNo: 'Khasra 412/1',
    officialReference: 'VNS/REV/2023/8921-A',
    landCategory: 'Category I-A: Prime Irrigated Multi-Crop Farmland',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    tehsil: 'Sarnath',
    village: 'Hukulganj Peri-Urban',
    locationDetails: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      tehsil: 'Sarnath',
      village: 'Hukulganj Peri-Urban',
      pincode: '221007',
      coordinatesText: '25.3615° N, 83.0185° E (UTM Zone 44N)',
    },
    ownerName: 'Ramprasad Shivhare & Co-sharers',
    ownerType: 'Private',
    areaHectares: 4.82,
    areaAcres: 11.91,
    areaSqMeters: 48200,
    perimeterMeters: 920,
    center: [25.3615, 83.0185],
    coordinates: [
      [25.3605, 83.0165],
      [25.3630, 83.0172],
      [25.3628, 83.0205],
      [25.3601, 83.0198],
      [25.3605, 83.0165],
    ],
    currentLandUse: 'Agricultural',
    registeredLandUse: 'Agricultural',
    status: 'Verified',
    lastUpdated: '2025-02-14',
    complianceScore: 94,
    riskScore: 18,
    floodRisk: 'Low',
    zoningViolation: false,
    nearWetlandBuffer: false,

    // 7. Soil / Environmental Indicators
    soilEnvironmentalIndicators: {
      soilType: 'Ganga Deep Alluvial Silt Loam',
      phLevel: 7.4,
      organicCarbonPct: 0.78,
      soilMoistureIndex: 34,
      erosionRisk: 'Low',
      groundwaterDepthMeters: 11.4,
      floodInundationClass: 'Low Risk',
      airQualityIndexAQI: 138,
    },

    // 8. Nearby Infrastructure
    nearbyInfrastructure: [
      'Varanasi Ring Road Phase 2 (1.2 km)',
      'Varuna Irrigation Canal Branch (350 m)',
      'Lal Bahadur Shastri International Airport Babatpur (16.5 km)',
      'Varanasi Cantonment Railway Junction (5.8 km)',
      '33/11 kV Power Substation Sarnath (1.1 km)',
    ],

    // 9. Satellite Observations
    latestObservation: {
      id: 'obs-001-2025',
      captureDate: '2025-02-10',
      satellite: 'Sentinel-2 MSI',
      imageUri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      ndvi: 0.74,
      ndwi: 0.12,
      changeScore: 4.2,
      resolution: '10m Multi-spectral',
      detectedClass: 'Agricultural',
      thermalAnomalyKelvin: 0.2,
    },
    satelliteObservations: [
      {
        id: 'obs-001-a',
        captureDate: '2025-02-10',
        satellite: 'Sentinel-2 MSI',
        imageUri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
        ndvi: 0.74,
        ndwi: 0.12,
        changeScore: 4.2,
        resolution: '10m',
        detectedClass: 'Agricultural',
      },
      {
        id: 'obs-001-b',
        captureDate: '2024-10-18',
        satellite: 'Cartosat-3',
        imageUri: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
        ndvi: 0.69,
        ndwi: 0.08,
        changeScore: 3.1,
        resolution: '2.5m Panchromatic',
        detectedClass: 'Agricultural',
      },
    ],

    // 5. Historical Land Use
    history: [
      { year: 2018, landUse: 'Agricultural', source: 'Revenue Records', confidence: 98, areaHa: 4.82, notes: 'Paddy and wheat double crop cycle' },
      { year: 2020, landUse: 'Agricultural', source: 'Sentinel-2 Satellite', confidence: 95, areaHa: 4.82, notes: 'Consistent vegetative signature' },
      { year: 2022, landUse: 'Agricultural', source: 'Landsat 8', confidence: 93, areaHa: 4.82, notes: 'Crop rotation verified' },
      { year: 2024, landUse: 'Agricultural', source: 'Sentinel-2 Satellite', confidence: 96, areaHa: 4.82, notes: 'Healthy biomass index' },
    ],

    // 10. Change History
    changeHistory: [
      {
        id: 'ch-001-1',
        date: '2025-01-20',
        eventType: 'Seasonal Crop Sowing Verification',
        detectedChange: 'Rabi season crop emergence confirmed',
        source: 'Automated Sentinel-2 MSI Workflow',
        status: 'Verified',
        remarks: 'Biomass health index +0.74 aligns with normal seasonal patterns.',
      },
      {
        id: 'ch-001-2',
        date: '2023-04-12',
        eventType: 'Revenue Khatauni Record Synchronization',
        detectedChange: 'Ownership title inherited co-tenure update',
        source: 'UP Bhulekh API Integration',
        status: 'Verified',
        remarks: 'Mutated in accordance with SDM revenue order No. 412.',
      },
    ],

    // 11. Relevant Research & Legal Provisions
    relevantResearch: [
      {
        id: 'res-01',
        title: 'UP Revenue Code 2006 (Section 80/143 Agricultural Tenure Safeguards)',
        statuteOrGuideline: 'UP Revenue Code 2006, Sec 80',
        year: 2023,
        relevanceSummary: 'Multi-crop irrigated land enjoys high preservation priority; conversion to non-agricultural status requires statutory SDM approval and development levy.',
      },
      {
        id: 'res-02',
        title: 'National Soil Health Card Policy & Gangetic Alluvial Protection Framework',
        statuteOrGuideline: 'ICAR / Ministry of Agriculture Directive 2022',
        year: 2022,
        relevanceSummary: 'High organic carbon content (0.78%) classifies this parcel as Class 1 prime agro-ecological soil.',
      },
    ],

    // 12. Policy Scenarios & Projected Impact
    policyScenariosImpact: [
      {
        scenarioName: 'Status Quo Baseline (2025-2030)',
        projectedZoning: 'Agricultural (High Conversion Pressure)',
        restrictionLevel: 'Conditional Approval',
        carbonCreditYieldTons: 12.4,
        economicImpactText: 'Potential land market valuation appreciation of +14% due to Ring Road proximity.',
      },
      {
        scenarioName: 'Eco-Resilient Green Buffer Directive',
        projectedZoning: 'Protected Agro-Ecology Zone',
        restrictionLevel: 'Strict Moratorium',
        carbonCreditYieldTons: 28.5,
        economicImpactText: 'Eligible for PM-Kisan agro-ecological subsidy bonus and organic soil carbon credits.',
      },
    ],
  },

  // 2. VARANASI - SARNATH PARCEL 2 (Commercial Encroachment on Farmland)
  {
    id: 'parcel-002',
    parcelCode: 'UP-VNS-SRN-0413',
    khasraNo: 'Khasra 413/Ga',
    officialReference: 'VNS/REV/2024/1104',
    landCategory: 'Category II-B: Peri-Urban Agro-Industrial Disputed Zone',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    tehsil: 'Sarnath',
    village: 'Hukulganj Peri-Urban',
    locationDetails: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      tehsil: 'Sarnath',
      village: 'Hukulganj Peri-Urban',
      pincode: '221007',
      coordinatesText: '25.3645° N, 83.0225° E (UTM Zone 44N)',
    },
    ownerName: 'Apex Infra Projects Pvt Ltd (Alleged)',
    ownerType: 'Private',
    areaHectares: 3.45,
    areaAcres: 8.52,
    areaSqMeters: 34500,
    perimeterMeters: 780,
    center: [25.3645, 83.0225],
    coordinates: [
      [25.3632, 83.0208],
      [25.3658, 83.0215],
      [25.3654, 83.0248],
      [25.3629, 83.0240],
      [25.3632, 83.0208],
    ],
    currentLandUse: 'Commercial',
    registeredLandUse: 'Agricultural',
    status: 'Encroachment Flagged',
    lastUpdated: '2025-02-16',
    complianceScore: 32,
    riskScore: 88,
    floodRisk: 'Moderate',
    zoningViolation: true,
    nearWetlandBuffer: true,

    // 7. Soil / Environmental Indicators
    soilEnvironmentalIndicators: {
      soilType: 'Compacted Silt Loam with Concrete Grading Subbase',
      phLevel: 8.3,
      organicCarbonPct: 0.24,
      soilMoistureIndex: 12,
      erosionRisk: 'Severe',
      groundwaterDepthMeters: 14.8,
      floodInundationClass: 'Zone II (Moderate)',
      airQualityIndexAQI: 168,
    },

    // 8. Nearby Infrastructure
    nearbyInfrastructure: [
      'Proposed Metro Feeder Route (150 m)',
      'Varuna River Green Corridor Buffer (85 m)',
      'Varanasi Ring Road Highway (600 m)',
      'Municipal Drainage Trunk Line 3 (240 m)',
    ],

    // 9. Satellite Observations
    latestObservation: {
      id: 'obs-002-2025',
      captureDate: '2025-02-12',
      satellite: 'Cartosat-3',
      imageUri: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      ndvi: 0.15,
      ndwi: -0.28,
      changeScore: 86.4,
      resolution: '2.5m Sub-Meter High Res',
      detectedClass: 'Commercial',
      thermalAnomalyKelvin: 2.8,
    },
    satelliteObservations: [
      {
        id: 'obs-002-a',
        captureDate: '2025-02-12',
        satellite: 'Cartosat-3',
        imageUri: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
        ndvi: 0.15,
        ndwi: -0.28,
        changeScore: 86.4,
        resolution: '2.5m',
        detectedClass: 'Commercial',
      },
      {
        id: 'obs-002-b',
        captureDate: '2023-03-24',
        satellite: 'Sentinel-2 MSI',
        imageUri: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
        ndvi: 0.42,
        ndwi: -0.05,
        changeScore: 48.0,
        resolution: '10m',
        detectedClass: 'Barren / Open',
      },
    ],

    // 5. Historical Land Use
    history: [
      { year: 2018, landUse: 'Agricultural', source: 'Revenue Records', confidence: 96, areaHa: 3.45, notes: 'Registered as agricultural land in Khatauni' },
      { year: 2021, landUse: 'Agricultural', source: 'Sentinel-2 Satellite', confidence: 91, areaHa: 3.45, notes: 'Fallow farmland' },
      { year: 2023, landUse: 'Barren / Open', source: 'Cartosat-3', confidence: 89, areaHa: 3.45, notes: 'Topsoil removal and grading detected' },
      { year: 2024, landUse: 'Commercial', source: 'Sentinel-2 Satellite', confidence: 94, areaHa: 3.45, notes: 'Warehouse steel structures identified without 143 conversion' },
    ],

    // 10. Change History
    changeHistory: [
      {
        id: 'ch-002-1',
        date: '2025-02-12',
        eventType: 'Unauthorized Construction Trigger',
        detectedChange: 'Pre-engineered steel shed erection on agricultural title',
        source: 'Cartosat-3 Deep Learning Classification Engine',
        status: 'Flagged',
        remarks: 'Zero Sec 80 / 143 non-agricultural conversion order found in revenue registry.',
      },
      {
        id: 'ch-002-2',
        date: '2024-11-04',
        eventType: 'Ground Surveyor Notice Served',
        detectedChange: 'Encroachment show-cause notice issued by SDM Sarnath',
        source: 'Revenue Court Notice Dispatch',
        status: 'Inspected',
        remarks: 'Awaiting hearing or demolition compliance order.',
      },
    ],

    // 11. Relevant Research & Legal Provisions
    relevantResearch: [
      {
        id: 'res-03',
        title: 'UP Revenue Code Section 80 (Demolition & Penalty on Illegal Conversion)',
        statuteOrGuideline: 'UP Revenue Code 2006, Section 80(2)',
        year: 2023,
        relevanceSummary: 'Unapproved commercial use of farmland incurs penalty of 5% circle rate value and summary demolition under Section 82.',
      },
      {
        id: 'res-04',
        title: 'Varanasi Master Plan 2031: Prohibited Industrial Storage in Heritage Buffer',
        statuteOrGuideline: 'VDA Notification 1142/MasterPlan/2022',
        year: 2022,
        relevanceSummary: 'Warehousing exceeding 500 sq m is explicitly barred within 1 km of Sarnath Archaeological boundary.',
      },
    ],

    // 12. Policy Scenarios & Projected Impact
    policyScenariosImpact: [
      {
        scenarioName: 'Eco-Resilient Green Buffer Directive',
        projectedZoning: 'Mandatory Reversion to Riparian Buffer',
        restrictionLevel: 'Strict Moratorium',
        carbonCreditYieldTons: -42.0,
        economicImpactText: 'Potential penalty levy of ₹48.2 Lakhs and mandatory structural removal.',
      },
      {
        scenarioName: 'Smart TOD & Agro-Logistics Cluster',
        projectedZoning: 'Permissible with Regularization Fine',
        restrictionLevel: 'Conditional Approval',
        carbonCreditYieldTons: -18.5,
        economicImpactText: 'Commercial regularization charge of ₹1.15 Cr payable to VDA.',
      },
    ],
  },

  // 3. VARANASI - SARNATH PARCEL 3 (Archaeological Protected Forest)
  {
    id: 'parcel-003',
    parcelCode: 'UP-VNS-SRN-0414',
    khasraNo: 'Khasra 414',
    officialReference: 'VNS/REV/2019/3310',
    landCategory: 'Category V: Protected Eco-Forest & Monument Sanctuary',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    tehsil: 'Sarnath',
    village: 'Sarnath Archaeological Buffer',
    locationDetails: {
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      tehsil: 'Sarnath',
      village: 'Sarnath Archaeological Buffer',
      pincode: '221007',
      coordinatesText: '25.3710° N, 83.0250° E (UTM Zone 44N)',
    },
    ownerName: 'Archaeological Survey of India & UP Forest Dept',
    ownerType: 'Government',
    areaHectares: 8.60,
    areaAcres: 21.25,
    areaSqMeters: 86000,
    perimeterMeters: 1240,
    center: [25.3710, 83.0250],
    coordinates: [
      [25.3685, 83.0220],
      [25.3730, 83.0235],
      [25.3725, 83.0280],
      [25.3680, 83.0265],
      [25.3685, 83.0220],
    ],
    currentLandUse: 'Forest / Green Cover',
    registeredLandUse: 'Forest / Green Cover',
    status: 'Verified',
    lastUpdated: '2025-01-28',
    complianceScore: 98,
    riskScore: 12,
    floodRisk: 'Low',
    zoningViolation: false,
    nearWetlandBuffer: false,

    soilEnvironmentalIndicators: {
      soilType: 'Forest Humus Enriched Alluvium',
      phLevel: 6.9,
      organicCarbonPct: 1.45,
      soilMoistureIndex: 48,
      erosionRisk: 'Low',
      groundwaterDepthMeters: 8.2,
      floodInundationClass: 'Low Risk',
      airQualityIndexAQI: 72,
    },

    nearbyInfrastructure: [
      'Dhamek Stupa Monument Site (400 m)',
      'Sarnath Deer Park (200 m)',
      'Archaeological Museum Sarnath (650 m)',
      'National Highway 29 (1.4 km)',
    ],

    latestObservation: {
      id: 'obs-003-2025',
      captureDate: '2025-02-08',
      satellite: 'Sentinel-2 MSI',
      imageUri: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      ndvi: 0.82,
      ndwi: 0.18,
      changeScore: 2.1,
      resolution: '10m Multi-spectral',
      detectedClass: 'Forest / Green Cover',
    },

    history: [
      { year: 2018, landUse: 'Forest / Green Cover', source: 'Survey of India', confidence: 99, areaHa: 8.60, notes: 'Protected afforestation zone' },
      { year: 2021, landUse: 'Forest / Green Cover', source: 'Sentinel-2 Satellite', confidence: 97, areaHa: 8.60, notes: 'Canopy density 68%' },
      { year: 2024, landUse: 'Forest / Green Cover', source: 'Sentinel-2 Satellite', confidence: 98, areaHa: 8.60, notes: 'Canopy density increased to 72%' },
    ],

    changeHistory: [
      {
        id: 'ch-003-1',
        date: '2024-07-15',
        eventType: 'Afforestation Canopy Density Audit',
        detectedChange: '+4% increase in dense foliage biomass',
        source: 'Forest Survey of India Quadrennial Audit',
        status: 'Verified',
        remarks: '3,200 native saplings planted under Green Varanasi Mission.',
      },
    ],

    relevantResearch: [
      {
        id: 'res-05',
        title: 'AMASR Act (Ancient Monuments & Archaeological Sites and Remains Act)',
        statuteOrGuideline: 'Government of India Act No. 24 of 1958',
        year: 2020,
        relevanceSummary: 'Statutory 100m Prohibited Area and 300m Regulated Area surrounding national monuments.',
      },
    ],

    policyScenariosImpact: [
      {
        scenarioName: 'Eco-Resilient Green Buffer Directive',
        projectedZoning: 'Core Heritage Eco-Sanctuary',
        restrictionLevel: 'Strict Moratorium',
        carbonCreditYieldTons: 185.0,
        economicImpactText: 'Eligible for ₹18.5 Lakhs in annual national ecological restoration credits.',
      },
    ],
  },

  // 4. BENGALURU - WHITEFIELD / SARJAPUR TECH CORRIDOR (Karnataka Sample Parcel)
  {
    id: 'parcel-ka-blr-001',
    parcelCode: 'KA-BLR-EJI-1082',
    khasraNo: 'Survey No. 108/2',
    officialReference: 'BBMP/REV/2024/7721',
    landCategory: 'Category II-A: High-Density Mixed IT/Commercial SEZ',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    tehsil: 'Bengaluru East',
    village: 'Varthur Peri-Urban Basin',
    locationDetails: {
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      tehsil: 'Bengaluru East',
      village: 'Varthur Peri-Urban Basin',
      pincode: '560087',
      coordinatesText: '12.9425° N, 77.7285° E (UTM Zone 43N)',
    },
    ownerName: 'TechPark Ventures Karnataka LLP',
    ownerType: 'Private',
    areaHectares: 6.20,
    areaAcres: 15.32,
    areaSqMeters: 62000,
    perimeterMeters: 1040,
    center: [12.9425, 77.7285],
    coordinates: [
      [12.9405, 77.7265],
      [12.9445, 77.7272],
      [12.9440, 77.7305],
      [12.9400, 77.7298],
      [12.9405, 77.7265],
    ],
    currentLandUse: 'Commercial',
    registeredLandUse: 'Commercial',
    status: 'Verified',
    lastUpdated: '2025-02-01',
    complianceScore: 91,
    riskScore: 38,
    floodRisk: 'Moderate',
    zoningViolation: false,
    nearWetlandBuffer: true,

    soilEnvironmentalIndicators: {
      soilType: 'Red Laterite Clayey Loam',
      phLevel: 6.4,
      organicCarbonPct: 0.52,
      soilMoistureIndex: 22,
      erosionRisk: 'Moderate',
      groundwaterDepthMeters: 28.5,
      floodInundationClass: 'Zone II (Moderate)',
      airQualityIndexAQI: 112,
    },

    nearbyInfrastructure: [
      'Namma Metro Purple Line Extension (800 m)',
      'Outer Ring Road (ORR) Junction (2.1 km)',
      'Varthur Lake Eco-Buffer Zone (280 m)',
      'Kempegowda International Airport (39 km)',
    ],

    latestObservation: {
      id: 'obs-blr-001',
      captureDate: '2025-01-25',
      satellite: 'Cartosat-3',
      imageUri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      ndvi: 0.28,
      ndwi: -0.32,
      changeScore: 8.5,
      resolution: '2.5m',
      detectedClass: 'Commercial',
      thermalAnomalyKelvin: 1.4,
    },

    history: [
      { year: 2018, landUse: 'Agricultural', source: 'Revenue Records', confidence: 94, areaHa: 6.20, notes: 'Ragi and coconut grove' },
      { year: 2021, landUse: 'Barren / Open', source: 'Sentinel-2 Satellite', confidence: 92, areaHa: 6.20, notes: 'Land acquisition & BDA layout conversion' },
      { year: 2024, landUse: 'Commercial', source: 'Cartosat-3', confidence: 96, areaHa: 6.20, notes: 'LEED Gold commercial IT campus operational' },
    ],

    changeHistory: [
      {
        id: 'ch-blr-1',
        date: '2024-09-18',
        eventType: 'Rainwater Harvesting & Lake Buffer Verification',
        detectedChange: '100% compliance with 30m lake setback confirmed',
        source: 'Karnataka State Pollution Control Board (KSPCB)',
        status: 'Verified',
        remarks: 'Zero STP effluent discharge into Varthur lake network.',
      },
    ],

    relevantResearch: [
      {
        id: 'res-blr-01',
        title: 'Karnataka Land Reforms Act & BBMP Comprehensive Development Plan 2031',
        statuteOrGuideline: 'BDA Master Plan Revised 2031',
        year: 2023,
        relevanceSummary: 'Regulates IT corridor floor area ratios (FAR 3.25) and mandatory 15% green coverage.',
      },
    ],

    policyScenariosImpact: [
      {
        scenarioName: 'Smart TOD & Agro-Logistics Cluster',
        projectedZoning: 'Transit-Oriented Commercial Density Hub',
        restrictionLevel: 'Unrestricted',
        carbonCreditYieldTons: 64.0,
        economicImpactText: 'Projected property tax yield of ₹4.8 Cr / year to BBMP.',
      },
    ],
  },

  // 5. AYODHYA - RAM MANDIR PERI-HERITAGE BUFFER (Uttar Pradesh Sample Parcel)
  {
    id: 'parcel-up-ayd-001',
    parcelCode: 'UP-AYD-SRJ-0219',
    khasraNo: 'Khasra 219/1',
    officialReference: 'AYD/ADA/2024/0912',
    landCategory: 'Category V: Saryu River Conservation & Pilgrimage Corridor',
    state: 'Uttar Pradesh',
    district: 'Ayodhya',
    tehsil: 'Sadar Ayodhya',
    village: 'Guptar Ghat Extension',
    locationDetails: {
      state: 'Uttar Pradesh',
      district: 'Ayodhya',
      tehsil: 'Sadar Ayodhya',
      village: 'Guptar Ghat Extension',
      pincode: '224123',
      coordinatesText: '26.7922° N, 82.1998° E (UTM Zone 44N)',
    },
    ownerName: 'Ayodhya Development Authority (ADA)',
    ownerType: 'Government',
    areaHectares: 5.75,
    areaAcres: 14.21,
    areaSqMeters: 57500,
    perimeterMeters: 980,
    center: [26.7922, 82.1998],
    coordinates: [
      [26.7905, 82.1978],
      [26.7940, 82.1985],
      [26.7935, 82.2020],
      [26.7900, 82.2012],
      [26.7905, 82.1978],
    ],
    currentLandUse: 'Forest / Green Cover',
    registeredLandUse: 'Forest / Green Cover',
    status: 'Verified',
    lastUpdated: '2025-02-11',
    complianceScore: 97,
    riskScore: 16,
    floodRisk: 'Moderate',
    zoningViolation: false,
    nearWetlandBuffer: true,

    soilEnvironmentalIndicators: {
      soilType: 'Saryu River Active Floodplain Alluvium',
      phLevel: 7.6,
      organicCarbonPct: 0.95,
      soilMoistureIndex: 42,
      erosionRisk: 'Moderate',
      groundwaterDepthMeters: 6.8,
      floodInundationClass: 'Zone II (Moderate)',
      airQualityIndexAQI: 84,
    },

    nearbyInfrastructure: [
      'Maharishi Valmiki International Airport Ayodhya (7.5 km)',
      'Ram Janmabhoomi Temple Complex (2.8 km)',
      'Saryu Riverfront Promenade (120 m)',
      'Ayodhya Dham Junction (3.4 km)',
    ],

    latestObservation: {
      id: 'obs-ayd-001',
      captureDate: '2025-02-04',
      satellite: 'Sentinel-2 MSI',
      imageUri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      ndvi: 0.79,
      ndwi: 0.35,
      changeScore: 1.8,
      resolution: '10m',
      detectedClass: 'Forest / Green Cover',
    },

    history: [
      { year: 2018, landUse: 'Barren / Open', source: 'Survey of India', confidence: 96, areaHa: 5.75, notes: 'Seasonal riparian sandbar' },
      { year: 2022, landUse: 'Forest / Green Cover', source: 'Sentinel-2 Satellite', confidence: 95, areaHa: 5.75, notes: 'Ayodhya Eco-Greening plantation' },
      { year: 2024, landUse: 'Forest / Green Cover', source: 'Cartosat-3', confidence: 98, areaHa: 5.75, notes: 'Mature riverfront green buffer established' },
    ],

    changeHistory: [
      {
        id: 'ch-ayd-1',
        date: '2024-12-01',
        eventType: 'Saryu Riverfront Heritage Audit',
        detectedChange: 'Zero unauthorized encroachment along river bank',
        source: 'Ayodhya Development Authority GIS Cell',
        status: 'Verified',
        remarks: 'Riverfront beautification and riparian afforestation 100% compliant.',
      },
    ],

    relevantResearch: [
      {
        id: 'res-ayd-01',
        title: 'Ayodhya Master Plan 2031 (Vedic City Sustainability Charter)',
        statuteOrGuideline: 'ADA Notification No. 412/Ayodhya2031',
        year: 2023,
        relevanceSummary: 'Mandates zero non-biodegradable construction within 200m of Saryu high flood level.',
      },
    ],

    policyScenariosImpact: [
      {
        scenarioName: 'Eco-Resilient Green Buffer Directive',
        projectedZoning: 'Sanctuary Pilgrimage Park',
        restrictionLevel: 'Strict Moratorium',
        carbonCreditYieldTons: 112.0,
        economicImpactText: 'Preserved under national pilgrimage eco-tourism grants.',
      },
    ],
  },
];

export const getLandUseColor = (landUse: string): string => {
  switch (landUse) {
    case 'Agricultural':
      return '#10B981'; // Emerald green
    case 'Commercial':
      return '#F59E0B'; // Amber
    case 'Residential':
      return '#3B82F6'; // Blue
    case 'Industrial':
      return '#8B5CF6'; // Purple
    case 'Forest / Green Cover':
      return '#059669'; // Dark emerald
    case 'Water Body / Wetland':
      return '#06B6D4'; // Cyan
    case 'Barren / Open':
      return '#94A3B8'; // Slate
    default:
      return '#64748B';
  }
};
