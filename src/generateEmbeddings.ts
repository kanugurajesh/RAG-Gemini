// generateEmbeddings.js
import { chunkText } from "./utils/chunkText"; // Adjust the path as necessary
import data from "./data/data"; // Adjust the path as necessary

import dotenv from "dotenv";

dotenv.config();

// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function run() {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  // Split the data into chunks
  const chunks = chunkText(data, 200); // Adjust chunk size as needed

  // Generate embeddings for each chunk
  const embeddings = [];
  for (const [index, chunk] of chunks.entries()) {
    const result = await model.embedContent(chunk);
    embeddings.push({
      id: `chunk-${index}`,
      values: result.embedding.values,
      metadata: {
        chunkIndex: index,
        text: chunk,
      },
    });
  }

  console.log("Generated Embeddings:", embeddings);
  return embeddings;
}

export default run;
