import { Hono } from "hono";
import { cors } from "hono/cors";
import { search } from "@lyrasearch/lyra";
import { intializeLyra } from "./initializeLyra";

const db = await intializeLyra();

const port = parseInt(process.env.PORT) || 3010;

const app = new Hono();

app.use(
  "/",
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/", async (c) => {
  const searchTerm = c.req.query("search");
  const results = await search(db, {
    term: searchTerm,
  });
  return c.json(results.hits);
});

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
