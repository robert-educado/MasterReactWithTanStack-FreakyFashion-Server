import { db } from "../db/index.js";
import { productsTable, productLocalesTable } from "../db/schema.js";
import { eq, and, count } from "drizzle-orm";
import { flattenProductResult } from "./utils.js";

export async function getProducts(
  locale: string,
  state?: string,
  page: number = 1,
  pageSize: number = 10
) {
  let result =
    state === "new"
      ? await getNewProducts(locale, page, pageSize)
      : await getAllProducts(locale, page, pageSize);

  return {
    products: result.products,
    meta: {
      total: result.total,
      locale,
      status: state || "all",
      page,
      pageSize,
    },
  };
}

async function getAllProducts(
  locale: string,
  page: number = 1,
  pageSize: number = 10
) {
  // Get total count of matching rows
  const productCount = await db
    .select({ count: count() })
    .from(productsTable)
    .innerJoin(
      productLocalesTable,
      eq(productsTable.id, productLocalesTable.product_id)
    )
    .where(eq(productLocalesTable.locale, locale))
    .get();

  const products = await db
    .select()
    .from(productsTable)
    .innerJoin(
      productLocalesTable,
      eq(productsTable.id, productLocalesTable.product_id)
    )
    .where(eq(productLocalesTable.locale, locale))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    products: products.map((x) => flattenProductResult(x)),
    total: productCount ? productCount.count : 0,
  };
}

export async function getProductBySlug(slug: string) {
  const row = await db
    .select()
    .from(productsTable)
    .innerJoin(
      productLocalesTable,
      eq(productsTable.id, productLocalesTable.product_id)
    )
    .where(eq(productLocalesTable.slug, slug))
    .get();

  const product = row ? flattenProductResult(row) : null;

  return product;
}

export async function createProduct(productData: {
  name: string;
  description: string;
  imageUrl: string;
  brand: string;
  price: number;
  locale: string;
}) {

  // Generate SKU from product name
  const sku = productData.name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .substring(0, 20);

  // Generate slug from name
  const slug = productData.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // Insert into products table
  const product = await db
    .insert(productsTable)
    .values({
      imageUrl: productData.imageUrl,
      brand: productData.brand,
      price: productData.price,
      sku,
      new: 1,
    })
    .returning()
    .get();

  // Insert into productLocales table
  await db.insert(productLocalesTable).values({
    product_id: product.id,
    name: productData.name,
    description: productData.description,
    locale: productData.locale,
    slug,
  });

  const createProduct = {
    ...productData,
    id: product.id,
  };

  return createProduct;
}

export async function deleteProduct(slug: string) {
  const result = await db
    .delete(productLocalesTable)
    .where(eq(productLocalesTable.slug, slug));

  return result.changes > 0;
}

async function getNewProducts(
  locale: string,
  page: number = 1,
  pageSize: number = 10
) {
  // Get total count of matching rows
  const productCount = await db
    .select({ count: count() })
    .from(productsTable)
    .innerJoin(
      productLocalesTable,
      eq(productsTable.id, productLocalesTable.product_id)
    )
    .where(
      and(eq(productLocalesTable.locale, locale), eq(productsTable.new, 1))
    )
    .get();

  const products = await db
    .select()
    .from(productsTable)
    .innerJoin(
      productLocalesTable,
      eq(productsTable.id, productLocalesTable.product_id)
    )
    .where(
      and(eq(productLocalesTable.locale, locale), eq(productsTable.new, 1))
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    products: products.map((x) => flattenProductResult(x)),
    total: productCount ? productCount.count : 0,
  };
}
