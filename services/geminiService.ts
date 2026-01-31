
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTutorResponse(history: {role: string, text: string}[], userInput: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: `You are a world-class English Language Tutor specializing in helping students move from A2 to B1 level.
        Your goals:
        1. Speak in clear, intermediate English.
        2. Correct the user's grammar mistakes gently.
        3. Suggest "B1-level" synonyms for simple "A2-level" words they use.
        4. Encourage them to explain their opinions and give reasons.
        5. Stay encouraging and patient.
        If the user asks for a correction, be specific.`,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Can you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The tutor is currently resting. Please check your connection and try again.";
  }
}

export async function checkGrammar(text: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this English sentence for A2/B1 level errors and provide a correction and explanation: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            correction: { type: Type.STRING },
            explanation: { type: Type.STRING },
            betterVersion: { type: Type.STRING, description: "A more B1-level way to say it" }
          },
          required: ["isCorrect", "correction", "explanation", "betterVersion"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return null;
  }
}
