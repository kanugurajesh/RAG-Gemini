// storeEmbeddings.js
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import generateEmbeddings from "./generateEmbeddings.js"; // Adjust the path as necessary

dotenv.config();

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

// Define your index name
const indexName = "index1";

const storeEmbeddings = async () => {
  // Generate embeddings
  const embeddings = await generateEmbeddings();

  // Initialize the index
  const index = pc.index(indexName);

  // await index.namespace("example-namespace2").upsert([

  await index.namespace("example-namespace2").upsert([...embeddings]);

  console.log("Embeddings successfully upserted to Pinecone.");
};

storeEmbeddings();
