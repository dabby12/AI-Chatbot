import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim()) {
      onSend(inputText);
      setInputText("");
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white p-2 rounded-xl shadow-lg">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md hover:scale-105 transition-all"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
