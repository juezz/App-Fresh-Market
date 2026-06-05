/**
 * Format a number as Colombian Peso (COP) currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Parse a COP formatted string back to a number
 * @param formatted - The formatted currency string
 * @returns The numeric value
 */
export function parseCOP(formatted: string): number {
  return Number(formatted.replace(/[^0-9,-]+/g, '').replace(',', '.'))
}
