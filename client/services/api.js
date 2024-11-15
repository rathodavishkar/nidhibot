import axios from "axios"

const URL = "http://localhost:3000"

export const getFood = async () => {
    const response = await axios.get(`${URL}/food`);
    console.log(response);
    
    return response.data;
}

export const getGeminiResponse = async ({prompt}) => {
    const response = await axios.post(`${URL}/gemini`, {prompt});

    console.log(response);

    return response.data;
}