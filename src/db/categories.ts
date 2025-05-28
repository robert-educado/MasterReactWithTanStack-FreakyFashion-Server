import { db } from "../db/index.js";
import {
  categoriesTable,
  productCategoriesTable,
  productLocalesTable,
  productsTable,
  type Category,
} from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import type { CategoryWithProducts, Product } from "../types.js";

export async function getCategories(locale: string) {
  let categories = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.locale, locale));

  return categories;
}

export async function getCategoryBySlug(slug: string) {

  const category = db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.slug, slug))
    .limit(1)
    .get();

  if (!category) {
    return null; // No category found with the given slug
  }

  const categoryProducts = await db
    .select()
    .from(productCategoriesTable)
    .leftJoin(
      productsTable,
      eq(productsTable.id, productCategoriesTable.product_id)
    )
    .leftJoin(
      productLocalesTable,
      eq(productLocalesTable.product_id, productsTable.id)
    )
    .where(
      and(
        eq(productCategoriesTable.category_id, category.id),
        eq(productLocalesTable.locale, category.locale)
      )
    );

  const products = categoryProducts.map((row) => ({
    id: row.products!.id,
    name: row.product_locales!.name,
    description: row.product_locales!.description,
    sku: row.products!.sku,
    price: row.products!.price,
    imageUrl: row.products!.imageUrl,
    brand: row.products!.brand,
    new: row.products!.new ? true : false,
    slug: row.product_locales!.slug,
    locale: row.product_locales!.locale,
  }));

  const result: CategoryWithProducts = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    locale: category.locale,
    products: products as Product[],
  };

  return result;
}
