import { KnowledgeDocument } from '../types';

export const mockKnowledgeDocuments: KnowledgeDocument[] = [
  {
    id: 'doc-001',
    title: 'Uttar Pradesh Revenue Code (Section 143 & 80: Land Use Conversion Framework)',
    author: 'Department of Revenue, Govt of Uttar Pradesh',
    year: 2023,
    state: 'Uttar Pradesh',
    district: 'All Districts',
    topic: 'Revenue & Land Reforms',
    fileUri: '/documents/up_revenue_code_sec143.pdf',
    accessLevel: 'Public',
    snippet: 'Agricultural land cannot be put to non-agricultural, commercial, or industrial use without prior declaration under Section 80 (erstwhile Section 143) by the Sub-Divisional Magistrate (SDM). Any unauthorized construction attracts summary demolition and penalty.',
    citation: 'UP Revenue Code 2006 (Amended 2023), Sections 80–84'
  },
  {
    id: 'doc-002',
    title: 'Varanasi Master Plan 2031 (Zoning Regulations & Sarnath Archaeological Buffer)',
    author: 'Varanasi Development Authority (VDA)',
    year: 2022,
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    topic: 'Zoning & Master Plan',
    fileUri: '/documents/vda_master_plan_2031.pdf',
    accessLevel: 'Public',
    snippet: 'A mandatory 300-meter regulated zone and 100-meter prohibited zone surrounds all ASI protected monuments including Dhamek Stupa and Ashoka Pillar in Sarnath. High-density commercial warehousing is strictly barred in Sector 4.',
    citation: 'VDA Notification No. 1142/MasterPlan/2022, Schedule C'
  },
  {
    id: 'doc-003',
    title: 'National Green Tribunal (NGT) Directive on Varuna River Floodplain & Wetlands Protection',
    author: 'Principal Bench, National Green Tribunal, New Delhi',
    year: 2024,
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    topic: 'Environmental & Wetland Protection',
    fileUri: '/documents/ngt_varuna_floodplain_2024.pdf',
    accessLevel: 'Public',
    snippet: 'No permanent construction or landfilling of seasonal wetlands is permissible within 100 meters of the High Flood Level (HFL) of River Varuna. District authorities are mandated to use satellite remote sensing for monthly compliance audits.',
    citation: 'NGT Order OA No. 419/2023 (Varuna Riparian Audit)'
  },
  {
    id: 'doc-004',
    title: 'Remote Sensing & Cadastral Overlay Guidelines for PM-GatiShakti & SVAMITVA Scheme',
    author: 'Ministry of Panchayati Raj & Survey of India',
    year: 2024,
    state: 'National',
    district: 'All Districts',
    topic: 'Remote Sensing & GIS',
    fileUri: '/documents/svamitva_cadastral_standards.pdf',
    accessLevel: 'Government Official',
    snippet: 'High-resolution drone ortho-rectified imagery (5cm GSD) and Sentinel-2 10m multispectral bands must be co-registered with local revenue Cadastral maps (Bhusampada/Bhulekh) to detect sub-parcel boundary shifts.',
    citation: 'MoPR SVAMITVA Technical Manual v3.2, Ch. 4'
  },
  {
    id: 'doc-005',
    title: 'Wetland (Conservation and Management) Rules: Gram Panchayat Water Bodies Protocol',
    author: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
    year: 2020,
    state: 'National',
    district: 'All Districts',
    topic: 'Environmental & Wetland Protection',
    fileUri: '/documents/wetland_rules_2020.pdf',
    accessLevel: 'Public',
    snippet: 'Conversion of notified ponds, talabs, and riparian flood basins into commercial plinths is strictly prohibited. State Wetland Authorities are empowered to reverse encroached titles with retrospective effect.',
    citation: 'MoEFCC GSR 160(E), Section 4'
  }
];

export const mockAiQueries: Record<string, { answer: string; confidence: number; citations: string[]; sourceDocIds: string[] }> = {
  'commercial': {
    answer: 'Under Section 80 of the Uttar Pradesh Revenue Code (erstwhile Sec 143), agricultural land cannot be utilized for commercial purposes without an explicit conversion order passed by the Sub-Divisional Magistrate (SDM). Furthermore, if the parcel falls within 300 meters of the Sarnath heritage precinct or within 100 meters of the Varuna River High Flood Level, conversion is strictly prohibited under VDA Master Plan 2031 and NGT OA 419/2023 directives.',
    confidence: 96.4,
    citations: ['UP Revenue Code 2006, Sec 80', 'VDA Master Plan 2031, Schedule C', 'NGT Order OA No. 419/2023'],
    sourceDocIds: ['doc-001', 'doc-002', 'doc-003']
  },
  'wetland': {
    answer: 'Seasonal wetlands, village talabs, and riparian buffer basins are classified as non-transferable public utility land under Section 77 of the UP Revenue Code and the Wetland (Conservation and Management) Rules. No construction, earthfilling, or zoning reclassification is permissible. The Supreme Court in Hinch Lal Tiwari v. Kamala Devi mandates immediate restoration of all recorded water bodies.',
    confidence: 98.1,
    citations: ['MoEFCC Wetland Rules 2020', 'UP Revenue Code Sec 77', 'Supreme Court (2001) 6 SCC 496'],
    sourceDocIds: ['doc-003', 'doc-005']
  },
  'sarnath': {
    answer: 'Properties in the Sarnath Archaeological buffer are governed by the Ancient Monuments and Archaeological Sites and Remains (AMASR) Act and VDA Master Plan 2031. Within 100 meters, all construction is strictly barred (Prohibited Area). Within 100–300 meters (Regulated Area), construction requires prior clearance from the National Monuments Authority (NMA) and VDA.',
    confidence: 95.8,
    citations: ['AMASR Act 1958/2010', 'VDA Master Plan 2031'],
    sourceDocIds: ['doc-002']
  }
};
