// The below code snippet is used to store embeddings in the Pinecone database. The storeEmbeddings function is defined to generate embeddings using the generateEmbeddings function and store them in the Pinecone index. The embeddings are upserted to the Pinecone index using the upsert method. The index is initialized with the specified dimension, metric, and serverless configuration. The storeEmbeddings function is then called to store the embeddings in the Pinecone database.

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
