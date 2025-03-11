export function sliceDecimals(num: number, casas = 2) {
  const parts = num.toString().split('.')

  if (parts.length === 2 && parts[1].length > casas) {
    return parseFloat(num.toFixed(casas))
  }
  return num
}
