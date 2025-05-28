import { Hono } from "hono";
import { search } from "../db/search.js";
const productsRoute = new Hono();

// GET /search[?q={query}&locale=en]
productsRoute.get("/", async (c) => {

  const locale = c.req.query("locale") || "en";
  const term = c.req.query("q");
  const page = parseInt(c.req.query("page") || "1", 10);
  const pageSize = parseInt(c.req.query("pageSize") || "10", 10);
  const filters = {
    category: c.req.query("category"),
  }

  if (!term) {
    return c.json({ error: "Search term is required" }, 400);
  }

  const result = await search(term, locale, page, pageSize, filters);
  
  const response = {
    results: result.data,
    meta: {
      total: result.meta.total,
      page,
      pageSize,
    },
  }

  return c.json(response);
});

export default productsRoute;