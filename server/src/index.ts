import { Hono } from "hono";
import { cors } from "hono/cors";
import { search } from "@lyrasearch/lyra";
import { intializeLyra } from "./initializeLyra";

const port = parseInt(process.env.PORT) || 3010;

const db = await intializeLyra();

const app = new Hono();

app.use(
  "/",
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/", async (c) => {
  if (db instanceof Error) return c.text("error", 500);
  const searchTerm = c.req.query("search");

  const results = await search(db, {
    term: searchTerm,
  });
  return c.json(results?.hits);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Custom Error Message", 500);
});

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
