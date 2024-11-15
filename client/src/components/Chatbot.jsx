import React, { useState } from "react";
import { getGeminiResponse } from "../../services/api";


function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hey, How can i Help you?" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (input.trim() === "")
        {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Please Enter Something..." },
            ]);
            return;
        }

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const resGem = await getGeminiResponse({ prompt: input });

            // Format the Gemini response (e.g., add line breaks for better readability)
            const formattedResponse = resGem
                .replace(/(?:\.\s)/g, ".\n") // Add line breaks after each period
                .replace(/(?:\?\s)/g, "?\n") // Add line breaks after each question
                .trim();

            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: formattedResponse },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Sorry, there was an error. Please try again." },
            ]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-blue-100 p-4 items-center">
            <div className="flex flex-col h-full max-w w-full border border-gray-300 rounded-lg bg-white p-4">
                <div className="flex-1 overflow-auto">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`my-2 p-2 rounded-md max-w-xs ${
                                message.sender === "bot"
                                    ? "bg-blue-100 self-start"
                                    : "bg-green-100 self-end"
                            }`}
                        >
                            {message.text.split("\n").map((line, idx) => (
                                <p key={idx} className="mb-1">
                                    {line}
                                    
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;
