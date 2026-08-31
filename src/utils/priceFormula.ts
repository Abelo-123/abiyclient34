import { formatETB } from '../constants';

export interface PriceFormulaResult {
    originalRate: number;
    multiplier: number;
    finalRate: number;
    unitPrice: number;
    quantity: number;
    subtotal: number;
    discountPercent: number;
    discountAmount: number;
    finalTotal: number;
    perThousandEquation: string;
    totalChargeEquation: string;
}

export function calculatePriceFormula(
    serviceRate: number,
    originalRateInput?: number,
    rateMultiplierInput = 1,
    quantity = 1000,
    discountPercent = 0
): PriceFormulaResult {
    const finalRate = serviceRate;
    const multiplier = rateMultiplierInput > 0 ? rateMultiplierInput : 1;
    // Derive original rate if not explicitly supplied
    const originalRate = originalRateInput && originalRateInput > 0 
        ? originalRateInput 
        : (multiplier !== 1 ? finalRate / multiplier : finalRate);
    
    const unitPrice = finalRate / 1000;
    const subtotal = (quantity / 1000) * finalRate;
    const discountAmount = discountPercent > 0 ? subtotal * (discountPercent / 100) : 0;
    const finalTotal = subtotal - discountAmount;

    const perThousandEquation = originalRate !== finalRate
        ? `(${formatETB(originalRate)} × ${multiplier}x = ${formatETB(finalRate)} / 1k)`
        : `(${formatETB(finalRate)} / 1k)`;

    const totalChargeEquation = discountPercent > 0
        ? `((${formatETB(finalRate)} ÷ 1000) × ${quantity.toLocaleString()}) - ${discountPercent}% = ${finalTotal.toFixed(4)} ETB`
        : `(${formatETB(finalRate)} ÷ 1000) × ${quantity.toLocaleString()} = ${finalTotal.toFixed(4)} ETB`;

    return {
        originalRate,
        multiplier,
        finalRate,
        unitPrice,
        quantity,
        subtotal,
        discountPercent,
        discountAmount,
        finalTotal,
        perThousandEquation,
        totalChargeEquation,
    };
}
