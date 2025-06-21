export const FormatPrice = (price: number, currencyKey: string) => {
  return `${currencyKey === "JPY" ? "¥" : currencyKey === "EUR" ? "€" : "$"}${price.toFixed(2)} ${currencyKey}`;
};