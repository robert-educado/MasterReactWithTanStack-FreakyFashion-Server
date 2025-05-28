import { Hono } from "hono";
import productsRoute from "./routes/products.js";
import categoriesRoute from "./routes/categories.js";
import aboutRoute from "./routes/about.js";
import searchRoute from "./routes/search.js";

const app = new Hono()

// Routes
app.route("/products", productsRoute);
app.route("/categories", categoriesRoute);
app.route("/about", aboutRoute);
app.route("/search", searchRoute);

export { app };