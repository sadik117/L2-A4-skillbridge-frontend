import axios from "axios";
import { env } from "@/env";

export const ragService = {
  query: async (query: string) => {
    try {
      const response = await axios.post(`${env.NEXT_PUBLIC_BACKEND_URL}/rag/query`, {
        query,
      });
      return response.data;
    } catch (error) {
      console.error("RAG Query Error:", error);
      throw error;
    }
  },
};
