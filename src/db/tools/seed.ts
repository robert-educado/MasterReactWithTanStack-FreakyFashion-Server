import { db } from "../index.js";
import {
  productsTable,
  productLocalesTable,
  categoriesTable,
  productCategoriesTable,
} from "../schema.js";

async function main() {

  await seedProducts();

  console.log("Products seeded successfully");

  await seedCategories();

  console.log("Categories seeded successfully");
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function seedCategories() {

  // Insert categories
  await db.insert(categoriesTable).values([
    // -----------------------------------------------------------
    // English (locale: "en")
    // -----------------------------------------------------------
    {
      name: "Clothing",
      locale: "en",
      slug: "clothing",
    },
    {
      name: "Accessories",
      locale: "en",
      slug: "accessories",
    },

    // -----------------------------------------------------------
    // Norwegian (locale: "no")
    // -----------------------------------------------------------
    {
      name: "Klær",
      locale: "no",
      slug: "klaer",
    },
    {
      name: "Tilbehør",
      locale: "no",
      slug: "tilbehor",
    },
  ]);

  // Insert categories
  await db.insert(productCategoriesTable).values([
    {
      product_id: 1,
      category_id: 1,
    },
    {
      product_id: 2,
      category_id: 1,
    },
    {
      product_id: 3,
      category_id: 1,
    },
    {
      product_id: 4,
      category_id: 1,
    },
    {
      product_id: 5,
      category_id: 1,
    },
    {
      product_id: 6,
      category_id: 1,
    },
    {
      product_id: 7,
      category_id: 1,
    },
    {
      product_id: 8,
      category_id: 1,
    },
    {
      product_id: 9,
      category_id: 1,
    },
    {
      product_id: 10,
      category_id: 1,
    },
    {
      product_id: 1,
      category_id: 2,
    },
    {
      product_id: 2,
      category_id: 2,
    },
    {
      product_id: 3,
      category_id: 2,
    },
    {
      product_id: 4,
      category_id: 2,
    },
    {
      product_id: 5,
      category_id: 2,
    },
    {
      product_id: 6,
      category_id: 2,
    },
    {
      product_id: 7,
      category_id: 2,
    },
    {
      product_id: 8,
      category_id: 2,
    },
    {
      product_id: 9,
      category_id: 2,
    },
    {
      product_id: 10,
      category_id: 2,
    },
  ]);
}

async function seedProducts() {
  
  await db.insert(productsTable).values([
    {
      sku: "TSHIRT001",
      price: 19,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "JEANS001",
      price: 49,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "JACKET001",
      price: 89,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "DRESS001",
      price: 59,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "SKIRT001",
      price: 29,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "HOODIE001",
      price: 39,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "SHORTS001",
      price: 24,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
      new: 1,
    },
    {
      sku: "SHIRT001",
      price: 34,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
      new: 1,
    },
    {
      sku: "SWEATER001",
      price: 44,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
    {
      sku: "COAT001",
      price: 99,
      imageUrl: "https://placehold.co/300x400.png",
      brand: "Brand x",
    },
  ]);

  await db.insert(productLocalesTable).values([
    // -----------------------------------------------------------
    // English (locale: "en")
    // -----------------------------------------------------------
    {
      product_id: 1,
      locale: "en",
      name: "Classic T-Shirt",
      description: "A comfortable cotton t-shirt for everyday wear.",
      slug: "classic-t-shirt",
    },
    {
      product_id: 2,
      locale: "en",
      name: "Blue Jeans",
      description: "Stylish blue denim jeans with a slim fit.",
      slug: "blue-jeans",
    },
    {
      product_id: 3,
      locale: "en",
      name: "Leather Jacket",
      description: "A trendy leather jacket for a cool look.",
      slug: "leather-jacket",
    },
    {
      product_id: 4,
      locale: "en",
      name: "Summer Dress",
      description: "Lightweight dress perfect for summer days.",
      slug: "summer-dress",
    },
    {
      product_id: 5,
      locale: "en",
      name: "Pleated Skirt",
      description: "Elegant pleated skirt for any occasion.",
      slug: "pleated-skirt",
    },
    {
      product_id: 6,
      locale: "en",
      name: "Casual Hoodie",
      description: "Soft hoodie for casual comfort.",
      slug: "casual-hoodie",
    },
    {
      product_id: 7,
      locale: "en",
      name: "Denim Shorts",
      description: "Classic denim shorts for warm weather.",
      slug: "denim-shorts",
    },
    {
      product_id: 8,
      locale: "en",
      name: "Formal Shirt",
      description: "Crisp formal shirt for business or events.",
      slug: "formal-shirt",
    },
    {
      product_id: 9,
      locale: "en",
      name: "Wool Sweater",
      description: "Warm wool sweater for chilly days.",
      slug: "wool-sweater",
    },
    {
      product_id: 10,
      locale: "en",
      name: "Winter Coat",
      description: "Insulated coat to keep you warm in winter.",
      slug: "winter-coat",
    },
    // -----------------------------------------------------------
    // Norwegian (locale: "no")
    // -----------------------------------------------------------
    {
      product_id: 1,
      locale: "no",
      name: "Klassisk T-skjorte",
      description: "En komfortabel bomulls t-skjorte for hverdagsbruk.",
      slug: "klassisk-t-skjorte",
    },
    {
      product_id: 2,
      locale: "no",
      name: "Blå Jeans",
      description: "Stilige blå dongeribukser med smal passform.",
      slug: "bla-jeans",
    },
    {
      product_id: 3,
      locale: "no",
      name: "Skinnjakke",
      description: "En trendy skinnjakke for en kul stil.",
      slug: "skinnjakke",
    },
    {
      product_id: 4,
      locale: "no",
      name: "Sommerkjole",
      description: "Lett kjole perfekt for sommerdager.",
      slug: "sommerkjole",
    },
    {
      product_id: 5,
      locale: "no",
      name: "Plissert Skjørt",
      description: "Elegant plissert skjørt for enhver anledning.",
      slug: "plissert-skjort",
    },
    {
      product_id: 6,
      locale: "no",
      name: "Hettegenser",
      description: "Myk hettegenser for avslappet komfort.",
      slug: "hettegenser",
    },
    {
      product_id: 7,
      locale: "no",
      name: "Dongerishorts",
      description: "Klassiske dongerishorts for varmt vær.",
      slug: "dongerishorts",
    },
    {
      product_id: 8,
      locale: "no",
      name: "Formell Skjorte",
      description: "Klassisk formell skjorte til jobb eller fest.",
      slug: "formell-skjorte",
    },
    {
      product_id: 9,
      locale: "no",
      name: "Ullgenser",
      description: "Varm ullgenser for kjølige dager.",
      slug: "ullgenser",
    },
    {
      product_id: 10,
      locale: "no",
      name: "Vinterjakke",
      description: "Isolert jakke som holder deg varm om vinteren.",
      slug: "vinterjakke",
    },
  ]);
}
