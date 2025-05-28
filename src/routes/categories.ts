import { Hono } from "hono";
import { getCategories, getCategoryBySlug } from "../db/categories.js";

const categoriesRoute = new Hono();

// GET /categories[?locale=en]
categoriesRoute.get("/", async (c) => {

  const locale = c.req.query("locale") || "en";

  const categories = await getCategories(locale);

  const response = {
    categories,
    meta : {
      locale,
      total: categories.length,
    },
  };
  
  return c.json(response);
});

// GET /categories/:slug
categoriesRoute.get("/:slug", async (c) => {

  const slug = c.req.param("slug");

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return c.json({ error: "Category not found" }, 404);
  }

  return c.json(category);
});

export default categoriesRoute;