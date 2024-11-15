import express from "express";
import cors from "cors";
import env from "dotenv"
import { getGeminiResponse } from "./gemini.js";

env.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Avishkar");
});

app.get("/food", (req, res) => {
    res.send("Dal Bhaat");
});

app.get("/cake", (req, res) => {
    res.send("happy birthday");
});

app.post("/gemini", async (req, res) => {
    
    const p = req.body.prompt; 
    console.log(p);

    
    const resGem = await getGeminiResponse({prompt: p});
    console.log(resGem);
    

    res.send(resGem);
});

app.listen(PORT, async (req, res)=> {
//  await getGeminiResponse({prompt: "are you receiving my  request?"});
    console.log(`Bhai mi tujhe request aiktoy, port ${PORT} vrti`);
})

// http://localhost:3000/food