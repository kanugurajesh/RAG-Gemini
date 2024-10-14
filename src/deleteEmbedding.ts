// deleteEmbeddings.ts
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import { pineconeIndexName } from "./components.js";

dotenv.config();

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

const deleteEmbeddings = async () => {
  await pc.deleteIndex(pineconeIndexName);
};

deleteEmbeddings();
