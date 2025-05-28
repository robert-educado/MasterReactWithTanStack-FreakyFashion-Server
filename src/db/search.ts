import { eq, and, like, count } from "drizzle-orm";
import { productLocalesTable, productsTable } from "./schema.js";
import { db } from "./index.js";
import { flattenProductResult } from "./utils.js";

export async function search(term: string, locale: string, page: number = 1, pageSize: number = 10, filters: { category?: string }) {

  locale = locale || "en";
  term = term ? term.trim().toLowerCase() : "";

  // Get total count of matching rows
  const [ result ] = await db
    .select({ count: count() })
    .from(productsTable)
    .innerJoin(productLocalesTable, eq(productsTable.id, productLocalesTable.product_id))
    .where(and(like(productLocalesTable.name, `%${term}%`), eq(productLocalesTable.locale, locale)));

  let rows = await db
    .select()
    .from(productsTable)
    .innerJoin(productLocalesTable, eq(productsTable.id, productLocalesTable.product_id))
    .where(and(like(productLocalesTable.name, `%${term}%`), eq(productLocalesTable.locale, locale)))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const products = rows.map((x) => flattenProductResult(x));

  return {
    data: products,
    meta: {
      total: result.count,
    },
  };
}
