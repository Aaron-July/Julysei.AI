import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = (typeof process !== 'undefined' ? process.env.API_KEY : undefined) || '';
const ai = new GoogleGenAI({ apiKey });

// Standard Text Chat Model
const textModel = 'gemini-3-flash-preview';

// Thinking Model for complex analysis
const thinkingModel = 'gemini-3-pro-preview';

// Fast Model for quick summaries
const fastModel = 'gemini-flash-lite-latest'; // Mapping for gemini-2.5-flash-lite

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: textModel,
    config: {
      systemInstruction: "You are the AI Assistant for Julysei.AI. **Keep your responses extremely short and concise.** Use **bullet points** to structure information. Avoid long paragraphs. Be helpful but get straight to the point.",
    },
  });
};

export const generateQuickSummary = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: fastModel,
      contents: `Summarize this in 10 words or less: ${text}`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Fast summary failed:", error);
    return "AI Analysis Unavailable";
  }
};

export const generateDeepAnalysis = async (projectDescription: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: thinkingModel,
      contents: `Analyze the technical complexity and potential AI improvements for this project description: "${projectDescription}". Provide a strategic insight.`,
      config: {
        thinkingConfig: { thinkingBudget: 2048 }, // Moderate thinking budget
      }
    });
    return response.text || "Analysis complete.";
  } catch (error) {
    console.error("Deep analysis failed:", error);
    return "Detailed analysis currently unavailable.";
  }
};