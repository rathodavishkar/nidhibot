import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "dotenv";

env.config();
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
export const getGeminiResponse = async ({prompt}) => {
    console.log("this is prompt" , prompt);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // const prompt = "Write a story about Avishkar in short";

    const result = await model.generateContent(`${prompt}`);
   
    console.log(result.response.text());
    return result.response.text();
}
