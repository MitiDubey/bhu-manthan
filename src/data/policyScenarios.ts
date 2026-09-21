import { PolicyScenario } from '../types';

export const mockScenarios: PolicyScenario[] = [
  {
    id: 'scen-baseline',
    name: 'Status Quo Baseline (2025–2030)',
    description: 'Current trendline growth without new green zoning intervention or strict riparian buffers.',
    regionId: 'reg-vns-periurban',
    regionName: 'Varanasi Peri-Urban North Corridor',
    baseYear: 2025,
    targetYear: 2030,
    parameters: {
      urbanExpansionRate: 4.8,
      greenBufferSetback: 50,
      industrialZoneQuota: 14.5,
      agriculturalProtectionWeight: 4,
      floodPlainBufferStrictness: 3,
      populationGrowthRate: 2.8
    },
    results: {
      urbanGrowthHa: 1420,
      agriculturalLossHa: -1280,
      forestCoverDeltaHa: -140,
      carbonOffsetTonsDelta: -8400,
      revenueImpactCrores: 340,
      foodSecurityIndexDelta: -8.4,
      affectedParcelsCount: 412
    }
  },
  {
    id: 'scen-eco-first',
    name: 'Eco-Resilient Green Buffer Directive',
    description: 'Strict enforcement of 150m river corridors, wetland rejuvenation, and mandatory 25% green cover on new developments.',
    regionId: 'reg-vns-periurban',
    regionName: 'Varanasi Peri-Urban North Corridor',
    baseYear: 2025,
    targetYear: 2030,
    parameters: {
      urbanExpansionRate: 2.1,
      greenBufferSetback: 150,
      industrialZoneQuota: 8.0,
      agriculturalProtectionWeight: 9,
      floodPlainBufferStrictness: 9,
      populationGrowthRate: 2.2
    },
    results: {
      urbanGrowthHa: 520,
      agriculturalLossHa: -310,
      forestCoverDeltaHa: 210,
      carbonOffsetTonsDelta: 16500,
      revenueImpactCrores: 190,
      foodSecurityIndexDelta: 4.2,
      affectedParcelsCount: 168
    }
  },
  {
    id: 'scen-smart-growth',
    name: 'Smart TOD & Agro-Logistics Cluster',
    description: 'Transit-oriented high-density mixed development along Ring Road with preserved prime multi-crop farmland.',
    regionId: 'reg-vns-periurban',
    regionName: 'Varanasi Peri-Urban North Corridor',
    baseYear: 2025,
    targetYear: 2030,
    parameters: {
      urbanExpansionRate: 3.4,
      greenBufferSetback: 100,
      industrialZoneQuota: 11.0,
      agriculturalProtectionWeight: 7,
      floodPlainBufferStrictness: 7,
      populationGrowthRate: 2.6
    },
    results: {
      urbanGrowthHa: 890,
      agriculturalLossHa: -640,
      forestCoverDeltaHa: 85,
      carbonOffsetTonsDelta: 5200,
      revenueImpactCrores: 480,
      foodSecurityIndexDelta: 1.1,
      affectedParcelsCount: 275
    }
  }
];

// Helper to compute dynamic simulation results based on arbitrary slider parameter tweaks
export const computeSimulationResults = (params: PolicyScenario['parameters']) => {
  const years = 5;
  const expansionFactor = params.urbanExpansionRate / 3.5;
  const greenFactor = params.greenBufferSetback / 100;
  const agriWeightFactor = (11 - params.agriculturalProtectionWeight) / 5;

  const urbanGrowthHa = Math.round(750 * expansionFactor * (1 + params.populationGrowthRate * 0.15));
  const agriculturalLossHa = -Math.round(urbanGrowthHa * 0.85 * agriWeightFactor);
  const forestCoverDeltaHa = Math.round(greenFactor * 120 - expansionFactor * 50);
  const carbonOffsetTonsDelta = Math.round(forestCoverDeltaHa * 80 - urbanGrowthHa * 4.5);
  const revenueImpactCrores = Math.round(urbanGrowthHa * 0.32 + (params.industrialZoneQuota * 15));
  const foodSecurityIndexDelta = Number((-(agriculturalLossHa / 150)).toFixed(1));
  const affectedParcelsCount = Math.round(urbanGrowthHa * 0.31);

  return {
    urbanGrowthHa,
    agriculturalLossHa,
    forestCoverDeltaHa,
    carbonOffsetTonsDelta,
    revenueImpactCrores,
    foodSecurityIndexDelta,
    affectedParcelsCount
  };
};
