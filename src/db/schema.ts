import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable(
  "products",
  {
    id: int().primaryKey({ autoIncrement: true }),
    sku: text().notNull().unique(),
    price: integer().notNull(),
    imageUrl: text().notNull(),
    brand: text().notNull(),
    new: integer("new").default(0).notNull(),
  }
);

export const productLocalesTable = sqliteTable('product_locales', {
  id: integer('id').primaryKey(),
 product_id: integer('product_id')
    .references(() => productsTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  locale: text('locale').notNull(),
  slug: text('slug').unique()
});

export const categoriesTable = sqliteTable(
  "categories",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    locale: text('locale').notNull(),    
    slug: text().notNull().unique(),
  }
);

export const productCategoriesTable = sqliteTable(
  "product_categories",
  {
    id: int().primaryKey({ autoIncrement: true }),
    product_id: int().notNull().references(() => productsTable.id)
        .references(() => productsTable.id, { onDelete: 'cascade' }),
    category_id: int().notNull().references(() => categoriesTable.id)
        .references(() => categoriesTable.id, { onDelete: 'cascade' }),
  }
);

// Export types for tables
export type Product = typeof productsTable.$inferSelect;
export type ProductLocale = typeof productLocalesTable.$inferSelect;
export type Category = typeof categoriesTable.$inferSelect;
export type ProductCategory = typeof productCategoriesTable.$inferSelect;