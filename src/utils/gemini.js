import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateAIResponse = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(userInput);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I couldn't process your request right now. Please try again.";
  }
};
