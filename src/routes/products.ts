import { Hono } from "hono";
import { createProduct, deleteProduct, getProductBySlug, getProducts } from "../db/products.js";

const validLocales = ["en", "no"];

const productsRoute = new Hono();

// GET /products[?locale=en&status=new]
productsRoute.get("/", async (c) => {

  const locale = c.req.query("locale") || "en";
  const state = c.req.query("status");
  const page = parseInt(c.req.query("page") || "1", 10);
  const pageSize = parseInt(c.req.query("pageSize") || "10", 10);

  if (!validLocales.includes(locale)) {
    return c.json({ error: "Invalid locale" }, 400);
  }

  const result = await getProducts(locale, state, page, pageSize);

  const response = {
    products: result.products,
    meta: {
      total: result.meta.total,
      locale,
      status: state || "all",
      page,
      pageSize,      
    },
  }

  return c.json(response);
});

// GET /products/:slug
productsRoute.get("/:slug", async (c) => {
  
  const { slug } = c.req.param();
  
  const product = await getProductBySlug(slug);

  if (!product) {
    return c.json({ error: "Product not found" }, 404);
  }

  return c.json(product);
});


// POST /products
productsRoute.post("/", async (c) => {
  
  const {
    name,
    description,
    imageUrl,
    brand,
    price,
    locale,
  } = await c.req.json();

  const product = await createProduct({
    name,
    description,
    imageUrl,
    brand,
    price,
    locale,
  });

  return c.json(product, 201);
});

// DELETE /products/:slug
productsRoute.delete("/:slug", async (c) => {
  
  const { slug } = c.req.param();

  const deleted = await deleteProduct(slug);

  if (!deleted) {
    return c.json({ error: "Product not found" }, 404);
  }
  
  return c.body(null, 204);
});

export default productsRoute;
