const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        console.log("Models:", data.models?.map(m => m.name).join(", ") || data);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
