import { useState } from "react";
import { getFood } from "../services/api";

function App() {
  const [jim, setJim] = useState("hello");
  const [food, setFood] = useState("NO FOOD");

  const changeJim = () => {
    setJim("Im Avishkar");
  };

  const changeFood = async () => {
    let data = await getFood();
    setFood(data);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{jim}</h1>
      <button
        type="button"
        onClick={changeJim}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-6"
      >
        Change Jim
      </button>

      <p className="text-xl text-gray-800 mb-4">{food}</p>
      <button
        type="button"
        onClick={changeFood}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        
        Get Food
      </button>
    </div>
  );
}

export default App;
