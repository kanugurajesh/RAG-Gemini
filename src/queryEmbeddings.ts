// queryEmbeddings.ts
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { pineconeIndexName, pineconeNamespaceName } from "./components";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

// const indexName = "index1";

const queryEmbeddings = async (queryText: string) => {
  // Generate embedding for the query
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(queryText);
  const queryVector = result.embedding.values;

  const index = pc.index(pineconeIndexName);

  const queryResponse = await index.namespace(pineconeNamespaceName).query({
    topK: 3,
    vector: queryVector,
    includeMetadata: true,
  });

  if (queryResponse.matches.length === 0) {
    return "No results found";
  }

  if (queryResponse.matches[0]) {
    if (queryResponse.matches[0].metadata) {
      console.log("Query Results:", queryResponse.matches[0].metadata.text);
    } else {
      console.log("Metadata is undefined");
    }
  }

  return queryResponse;
};

// Example usage
queryEmbeddings("Describe your experience at IIT Bombay.");
