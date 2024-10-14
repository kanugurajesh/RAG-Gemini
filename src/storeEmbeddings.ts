// storeEmbeddings.ts
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import generateEmbeddings from "./generateEmbeddings.js"; // Adjust the path as necessary
import { pineconeIndexName, pineconeNamespaceName } from "./components";

dotenv.config();

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

const storeEmbeddings = async () => {
  // Generate embeddings

  await pc.createIndex({
    name: pineconeIndexName,
    dimension: 768,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });

  const embeddings = await generateEmbeddings();

  // Initialize the index
  const index = pc.index(pineconeIndexName);

  await index.namespace(pineconeNamespaceName).upsert([...embeddings]);

  console.log("Embeddings successfully upserted to Pinecone.");
};

storeEmbeddings();
