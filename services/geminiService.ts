
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImage(imageFile: File, prompt: string): Promise<string> {
  const base64Image = await fileToBase64(imageFile);
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: imageFile.type,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  // Safely access the response to prevent crashes.
  const candidate = response.candidates?.[0];
  const parts = candidate?.content?.parts;

  if (!parts) {
    if (response.promptFeedback?.blockReason) {
      throw new Error(`Request was blocked. Reason: ${response.promptFeedback.blockReason}`);
    }
    throw new Error("The model did not return any content. The response may have been blocked.");
  }

  // Find the first image part in the response
  for (const part of parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      const mimeType = part.inlineData.mimeType;
      return `data:${mimeType};base64,${base64ImageBytes}`;
    }
  }

  throw new Error("No image was generated in the response.");
}