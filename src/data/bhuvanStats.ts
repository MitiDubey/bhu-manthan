import type { AoiLulcRecord, BhuvanLulcPeriod } from '../types/parcel';

export const BHUVAN_LULC_PALETTE = {
  agriculture: '#ffff66',      // Bhuvan official light yellow for cropland
  agricultureDouble: '#a87000',// Bhuvan double cropped
  builtup: '#ff0000',          // Bhuvan official red for builtup urban/rural
  forest: '#38a800',           // Bhuvan official green for forest/scrub
  water: '#004da8',            // Bhuvan official blue for water bodies/canals
  wasteland: '#d7c29e',        // Bhuvan official khaki for wastelands/ravines
};

export const BHUVAN_LULC_STATS: Record<string, Record<BhuvanLulcPeriod, AoiLulcRecord>> = {
  // 1. Parcel GW-012 (2.8 ha)
  'GW-012': {
    '2005-06': {
      aoi_name: 'Parcel GW-012 (Khasra 142/2)',
      aoi_level: 'Parcel',
      year: '2005-06',
      total_area_ha: 2.8,
      source: 'Bhuvan / ISRO-NRSC LULC 250K Cycle 1',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 2.8, percentage: 100, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Built-up (Urban / Rural)', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.water },
        { className: 'Wasteland & Ravinous', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.wasteland },
      ]
    },
    '2011-12': {
      aoi_name: 'Parcel GW-012 (Khasra 142/2)',
      aoi_level: 'Parcel',
      year: '2011-12',
      total_area_ha: 2.8,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 2',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 2.8, percentage: 100, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Built-up (Urban / Rural)', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.water },
        { className: 'Wasteland & Ravinous', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.wasteland },
      ]
    },
    '2015-16': {
      aoi_name: 'Parcel GW-012 (Khasra 142/2)',
      aoi_level: 'Parcel',
      year: '2015-16',
      total_area_ha: 2.8,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 3',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 2.52, percentage: 90, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 0.28, percentage: 10, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Built-up (Urban / Rural)', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 0.0, percentage: 0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
  },

  // 2. Village: Morar Rural (1,840 ha)
  'Village': {
    '2005-06': {
      aoi_name: 'Morar Rural Village Cadastral Boundary',
      aoi_level: 'Village',
      year: '2005-06',
      total_area_ha: 1840,
      source: 'Bhuvan / ISRO-NRSC LULC 250K Cycle 1',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 1416.8, percentage: 77.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Built-up (Urban / Rural)', area_ha: 128.8, percentage: 7.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Water Body / Canal', area_ha: 110.4, percentage: 6.0, color: BHUVAN_LULC_PALETTE.water },
        { className: 'Wasteland & Ravinous', area_ha: 147.2, percentage: 8.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Forest & Scrub', area_ha: 36.8, percentage: 2.0, color: BHUVAN_LULC_PALETTE.forest },
      ]
    },
    '2011-12': {
      aoi_name: 'Morar Rural Village Cadastral Boundary',
      aoi_level: 'Village',
      year: '2011-12',
      total_area_ha: 1840,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 2',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 1324.8, percentage: 72.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Built-up (Urban / Rural)', area_ha: 202.4, percentage: 11.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Water Body / Canal', area_ha: 101.2, percentage: 5.5, color: BHUVAN_LULC_PALETTE.water },
        { className: 'Wasteland & Ravinous', area_ha: 174.8, percentage: 9.5, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Forest & Scrub', area_ha: 36.8, percentage: 2.0, color: BHUVAN_LULC_PALETTE.forest },
      ]
    },
    '2015-16': {
      aoi_name: 'Morar Rural Village Cadastral Boundary',
      aoi_level: 'Village',
      year: '2015-16',
      total_area_ha: 1840,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 3',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 1214.4, percentage: 66.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Built-up (Urban / Rural)', area_ha: 294.4, percentage: 16.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Water Body / Canal', area_ha: 92.0, percentage: 5.0, color: BHUVAN_LULC_PALETTE.water },
        { className: 'Wasteland & Ravinous', area_ha: 202.4, percentage: 11.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Forest & Scrub', area_ha: 36.8, percentage: 2.0, color: BHUVAN_LULC_PALETTE.forest },
      ]
    },
  },

  // 3. Tehsil: Morar (82,400 ha)
  'Tehsil': {
    '2005-06': {
      aoi_name: 'Morar Tehsil Administrative Extent',
      aoi_level: 'Tehsil',
      year: '2005-06',
      total_area_ha: 82400,
      source: 'Bhuvan / ISRO-NRSC LULC 250K Cycle 1',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 56032, percentage: 68.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 12360, percentage: 15.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Built-up (Urban / Rural)', area_ha: 5768, percentage: 7.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 4944, percentage: 6.0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 3296, percentage: 4.0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
    '2011-12': {
      aoi_name: 'Morar Tehsil Administrative Extent',
      aoi_level: 'Tehsil',
      year: '2011-12',
      total_area_ha: 82400,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 2',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 52736, percentage: 64.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 13184, percentage: 16.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Built-up (Urban / Rural)', area_ha: 8240, percentage: 10.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 4944, percentage: 6.0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 3296, percentage: 4.0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
    '2015-16': {
      aoi_name: 'Morar Tehsil Administrative Extent',
      aoi_level: 'Tehsil',
      year: '2015-16',
      total_area_ha: 82400,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 3',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 48616, percentage: 59.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 14008, percentage: 17.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Built-up (Urban / Rural)', area_ha: 11536, percentage: 14.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 4944, percentage: 6.0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 3296, percentage: 4.0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
  },

  // 4. District: Gwalior (521,400 ha / 5,214 km²)
  'District': {
    '2005-06': {
      aoi_name: 'Gwalior District Boundary',
      aoi_level: 'District',
      year: '2005-06',
      total_area_ha: 521400,
      source: 'Bhuvan / ISRO-NRSC LULC 250K Cycle 1',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 338910, percentage: 65.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 99066, percentage: 19.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Forest & Scrub', area_ha: 41712, percentage: 8.0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Built-up (Urban / Rural)', area_ha: 26070, percentage: 5.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Water Body / Canal', area_ha: 15642, percentage: 3.0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
    '2011-12': {
      aoi_name: 'Gwalior District Boundary',
      aoi_level: 'District',
      year: '2011-12',
      total_area_ha: 521400,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 2',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 323268, percentage: 62.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 99066, percentage: 19.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Forest & Scrub', area_ha: 41712, percentage: 8.0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Built-up (Urban / Rural)', area_ha: 41712, percentage: 8.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Water Body / Canal', area_ha: 15642, percentage: 3.0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
    '2015-16': {
      aoi_name: 'Gwalior District Boundary',
      aoi_level: 'District',
      year: '2015-16',
      total_area_ha: 521400,
      source: 'Bhuvan / ISRO-NRSC LULC 50K Cycle 3',
      classes: [
        { className: 'Agriculture (Kharif / Rabi)', area_ha: 302412, percentage: 58.0, color: BHUVAN_LULC_PALETTE.agriculture },
        { className: 'Wasteland & Ravinous', area_ha: 104280, percentage: 20.0, color: BHUVAN_LULC_PALETTE.wasteland },
        { className: 'Built-up (Urban / Rural)', area_ha: 57354, percentage: 11.0, color: BHUVAN_LULC_PALETTE.builtup },
        { className: 'Forest & Scrub', area_ha: 41712, percentage: 8.0, color: BHUVAN_LULC_PALETTE.forest },
        { className: 'Water Body / Canal', area_ha: 15642, percentage: 3.0, color: BHUVAN_LULC_PALETTE.water },
      ]
    },
  },
};
