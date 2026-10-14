export async function getProducts() {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("לא ניתן לטעון את המוצרים. נסו שוב.");
  }

  return response.json();
}

export async function compareProducts(productIds) {
  const response = await fetch("/api/compare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productIds })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "לא ניתן להשוות בין המוצרים.");
  }

  return result;
}
