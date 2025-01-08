import React from "react";
import { FiThumbsUp, FiThumbsDown, FiCopy, FiRefreshCcw } from "react-icons/fi";

const ChatBox = ({ messages }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard!");
  };

  const handleRegenerate = (text) => {
    alert("Regenerating response...");
  };

  return (
    <div className="space-y-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
        >
          <div
            className={`max-w-xs p-4 rounded-lg text-white shadow-lg ${
              msg.sender === "user"
                ? "bg-blue-500"
                : "bg-gray-200 text-black"
            }`}
          >
            <div
              className="text-black"
              dangerouslySetInnerHTML={{
                __html: msg.sender === "user" ? msg.text : msg.text,
              }}
            />
            <div className="flex space-x-2 mt-2">
              {msg.sender === "bot" && (
                <button
                  className="text-yellow-500 hover:text-yellow-700 rounded-full p-2 transition-all"
                  title="Regenerate Response"
                  onClick={() => handleRegenerate(msg.text)}
                >
                  <FiRefreshCcw />
                </button>
              )}
              <button
                className="text-blue-500 hover:text-blue-700 rounded-full p-2 transition-all"
                title="Copy Message"
                onClick={() => handleCopy(msg.text)}
              >
                <FiCopy />
              </button>
              <button
                className="text-green-500 hover:text-green-700 rounded-full p-2 transition-all"
                title="Like"
              >
                <FiThumbsUp />
              </button>
              <button
                className="text-red-500 hover:text-red-700 rounded-full p-2 transition-all"
                title="Dislike"
              >
                <FiThumbsDown />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
