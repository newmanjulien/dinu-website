export const FREE_ALLOWANCE = 5;
export const CONTRACT_STEP = 5;
const CUSTOM_STOP_COUNT = 5;
export const PRICING_BANDS = [
  { upTo: 30, rate: 60 },
  { upTo: 50, rate: 50 }
] as const;
export const MAX_GROWTH_CONTRACTS = PRICING_BANDS[PRICING_BANDS.length - 1].upTo;

export const PRICING_TIERS = ['free', 'growth', 'custom'] as const;
export type PricingTier = (typeof PRICING_TIERS)[number];

type PricingStop = {
  contracts: number | null;
  tier: PricingTier;
  monthlyPrice: number | null;
};

function createGrowthStop(contracts: number): PricingStop {
  const band = PRICING_BANDS.find(({ upTo }) => contracts <= upTo)!;
  const monthlyPrice = contracts * band.rate;

  return { contracts, tier: 'growth', monthlyPrice };
}

export const PRICING_STOPS: PricingStop[] = [
  ...Array.from({ length: FREE_ALLOWANCE }, (_, index): PricingStop => ({
    contracts: index + 1,
    tier: 'free',
    monthlyPrice: 0
  })),
  ...Array.from(
    { length: (MAX_GROWTH_CONTRACTS - FREE_ALLOWANCE) / CONTRACT_STEP },
    (_, index) => FREE_ALLOWANCE + (index + 1) * CONTRACT_STEP
  )
    .filter((contracts) => contracts <= PRICING_BANDS[0].upTo || contracts % 10 === 0)
    .map(createGrowthStop),
  ...Array.from({ length: CUSTOM_STOP_COUNT }, (_, index): PricingStop => ({
    contracts: index === 0 ? null : MAX_GROWTH_CONTRACTS + index * 25,
    tier: 'custom',
    monthlyPrice: null
  }))
];

export const FIRST_GROWTH_STOP = FREE_ALLOWANCE;
export const LAST_GROWTH_STOP = PRICING_STOPS.length - CUSTOM_STOP_COUNT - 1;
export const LAST_STOP = PRICING_STOPS.length - 1;

// Keep paid choices beneath Growth on the shared desktop slider.
export const STOP_POSITIONS = PRICING_STOPS.map((_, index) =>
  index < FIRST_GROWTH_STOP
    ? (index / (FIRST_GROWTH_STOP - 1)) * 30
    : index > LAST_GROWTH_STOP
      ? 70 + ((index - LAST_GROWTH_STOP - 1) / (CUSTOM_STOP_COUNT - 1)) * 30
      : 35 + ((index - FIRST_GROWTH_STOP) / (LAST_GROWTH_STOP - FIRST_GROWTH_STOP)) * 30
);

export function getNearestStop(position: number): number {
  return STOP_POSITIONS.reduce(
    (nearest, candidate, index) =>
      Math.abs(candidate - position) < Math.abs(STOP_POSITIONS[nearest] - position)
        ? index
        : nearest,
    0
  );
}

function formatPrice(monthlyPrice: number | null): string {
  return monthlyPrice === null ? 'Custom' : `$${monthlyPrice.toLocaleString('en-US')}`;
}

export function derivePricingDetails(selectedStop: number) {
  const selection = PRICING_STOPS[selectedStop];
  const growth = PRICING_STOPS[Math.min(Math.max(selectedStop, FIRST_GROWTH_STOP), LAST_GROWTH_STOP)];
  const selectionLabel = selection.contracts === null
    ? `Over ${MAX_GROWTH_CONTRACTS} signed contracts / month`
    : `${selection.tier === 'custom' ? '' : 'Up to '}${selection.contracts} signed contracts / month`;
  const selectionPrice = selection.tier === 'free'
    ? 'Free'
    : selection.tier === 'custom'
      ? 'Custom pricing'
      : `${formatPrice(selection.monthlyPrice)} / month`;

  return {
    activeTier: selection.tier,
    customContracts: selection.tier === 'custom' ? selection.contracts : null,
    growth: {
      contracts: growth.contracts,
      price: formatPrice(growth.monthlyPrice)
    },
    selectionLabel,
    selectionPrice,
    ariaValueText: `${selectionLabel}, ${selectionPrice}`
  };
}
