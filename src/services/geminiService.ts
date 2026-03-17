import { GoogleGenAI } from "@google/genai";
import { PersonaConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateBasketballContent(persona: PersonaConfig, prompt: string) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: persona.systemInstruction,
    },
  });

  const response = await model;
  return response.text;
}
