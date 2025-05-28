import { db } from "../index.js";
import { productLocalesTable, productsTable } from "../schema.js";

async function main() {
  
  console.log("Seeding t-shirts...");

  const colors: string[] = [
    "Red Orange",
    "Lime Green",
    "Royal Blue",
    "Sunflower",
    "Purple",
    "Turquoise",
    "Carrot",
    "Emerald",
    "Alizarin",
    "Peter River",
    "Amethyst",
    "Wet Asphalt",
    "Green Sea",
    "Nephritis",
    "Belize Hole",
    "Pumpkin",
    "Pomegranate",
    "Concrete",
    "Silver",
    "Orange",
    "Pink Glamour",
    "Green Teal",
    "Robin's Egg Blue",
    "Bright Blue",
    "Violet Blue",
    "Light Pink",
    "Storm Cloud",
    "Light Gray",
    "Banana",
    "Light Orange",
    "Coral",
    "Aquamarine",
    "Light Cyan",
    "Sky Blue",
    "Light Violet",
    "Ice Blue",
    "Lemon",
    "Peach",
    "Watermelon",
    "Powder Blue",
    "Bright Yellow",
    "Orange Peel",
    "Red Pink",
    "Grass Green",
    "Royal Purple",
    "Dark Blue",
    "Charcoal",
    "Deep Blue",
    "Strong Cyan",
    "Electric Purple",
    "Salmon",
    "Tropical Blue",
    "Pale Yellow",
    "Orange Coral",
    "Plum",
    "Indigo",
    "Light Red",
    "Mint",
    "Lavender",
    "Pink Blush",
    "Light Aqua",
    "Blue Lagoon",
    "Rose",
    "Slate",
    "Purple Navy",
    "Dark Indigo",
    "Sand",
    "Blue Gray",
    "Pale Gray",
    "Ivory",
  ];

  for (const color of colors) {
    const [insertedProduct] = await db
      .insert(productsTable)
      .values({
        sku: `tshirt-${color.toLowerCase().replace(/\s+/g, "-")}`,
        price: 19.99,
        imageUrl: `https://placehold.co/300x400.png?text=${encodeURIComponent(
          color
        )}`,
        brand: "Brand x",
      })
      .returning(); // returns inserted rows

    const insertedId = insertedProduct.id;

    const slug = `${color.toLowerCase().replace(/\s+/g, "-")}-tshirt`;

    await db.insert(productLocalesTable).values({
      product_id: insertedId,
      name: `${color} T-Shirt`,
      description: "A comfortable cotton t-shirt for everyday wear.",
      slug,
      locale: "en",
    });
  }
  console.log("Seeding completed.");
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
