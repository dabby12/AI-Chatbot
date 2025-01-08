import React, { useState } from "react";
import axios from "axios";
import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import DOMPurify from "dompurify";
const APIKEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API key is: "+APIKEY);
const App = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+APIKEY,
        {
          contents: [
            {
              parts: [{ text: text.trim() }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let botResponse =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "The AI did not return a valid response.";

      botResponse = botResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
      botResponse = botResponse.replace(/10\^(\-?\d+)/g, "10<sup>$1</sup>");
      botResponse = DOMPurify.sanitize(botResponse);

      if (botResponse) {
        const botMessage = { sender: "bot", text: botResponse };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        sender: "bot",
        text: "Error: Could not get a response.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
      <h1 className="text-center p-4 text-2xl font-bold text-white shadow-md bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl">
        Gemini Chatbot
      </h1>
      <div className="flex-grow p-4 overflow-y-auto bg-white rounded-xl shadow-lg">
        <ChatBox messages={messages} />
      </div>
      <div className="p-4">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default App;
