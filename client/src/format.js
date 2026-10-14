const shekelFormatter = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  maximumFractionDigits: 0
});

export function formatPrice(price) {
  return shekelFormatter.format(price);
}
