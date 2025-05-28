export const flattenProductResult = (result: any) => {
  return {
    id: result.products.id,
    name: result.product_locales.name,
    description: result.product_locales.description,
    imageUrl: result.products.imageUrl,
    brand: result.products.brand,
    sku: result.products.sku,
    price: result.products.price,
    new: result.products.new ? true : false,
    locale: result.product_locales.locale,
    slug: result.product_locales.slug,
  };
};