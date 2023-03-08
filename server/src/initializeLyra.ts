import { create, insertBatch } from "@lyrasearch/lyra";
import { ResponseType } from "./responseType";

export const intializeLyra = async () => {
  try {
    const response = await fetch("https://dummyjson.com/quotes");
    const jsonResponse: ResponseType = await response.json();

    const db = await create({
      schema: {
        quote: "string",
        author: "string",
      },
    });

    const insertConfig = {
      id: (doc) => {
        return doc.id.toString();
      },
    };

    await insertBatch(db, jsonResponse.quotes, insertConfig);

    return db;
  } catch (e) {
    return new Error("error");
  }
};
