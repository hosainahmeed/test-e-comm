export function formatProduct(product: any) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    brand: product.brand,
    category: product.category,
    rating: product.rating,
    image: product.thumbnail || product.image,
    description: product.description,
    slug:
      product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  };
}
