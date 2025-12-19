import React, { useState, useRef, useEffect } from "react";
import { Mic, Send, Sparkles } from "lucide-react";
import MessageIcon from "@mui/icons-material/Message";
import { generateAIResponse } from "../../utils/gemini"; // adjust path if needed

const CitizenChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const chatRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-IN";

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    setListening(true);
    recognitionRef.current.start();
  };

  const handleSend = async (messageText = null) => {
    const text = messageText || input;
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Temporary AI loading message
    const loadingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: loadingId, text: "Thinking...", sender: "ai" },
    ]);

    // Fetch AI response from Gemini
    let aiText = await generateAIResponse(text);

    // Remove markdown formatting (bold, italic, etc.)
    aiText = aiText
      .replace(/^#{1,6}\s+/gm, "")      // headings
      .replace(/\*\*(.*?)\*\*/g, "$1")  // bold
      .replace(/\*(.*?)\*/g, "$1")      // italics
      .replace(/__(.*?)__/g, "$1")      // underline
      .replace(/_(.*?)_/g, "$1")        // underline
      .replace(/`{1,3}(.*?)`{1,3}/g, "$1"); // code backticks

    // Replace loading message with actual AI response
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === loadingId ? { ...msg, text: aiText } : msg
      )
    );
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "How to file FIR?",
    "Bail process",
    "Legal aid",
    "Traffic fines",
    "Property rights",
    "Consumer protection",
    "Domestic violence",
    "Cybercrime complaint",
    "Employment disputes",
    "Tenant rights",
    "Police complaint procedure",
    "Document verification",
    "Court case status",
    "Environmental laws",
    "Child rights"
  ];

  return (
    <div className="fixed p-5 w-full sm:pt-2 pb-60 sm:pb-40 no-scrollbar h-[calc(100vh-4rem)]">
      <div className="w-full h-[110%] sm:h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full text-white flex items-center justify-center">
              <MessageIcon style={{ fontSize: 20 }} />
            </span>
            AI Legal Assistant
          </h2>
          <span className="text-xs px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full">
            Online
          </span>
        </div>

        {/* Chat Area */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto no-scrollbar mb-4 p-2 sm:p-3 space-y-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          {/* Permanent AI Greeting */}
          <div className="mr-auto bg-gray-300 dark:bg-gray-700 p-3 rounded-lg max-w-[75%] whitespace-pre-wrap">
            <p className="flex items-center gap-2 text-sm sm:text-lg">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span>
                <strong>Hello!</strong> I'm your AI Legal Assistant.
              </span>
            </p>
            <p className="text-sm sm:text-base mt-1 opacity-90">
              I can help you with legal questions, rights information, and
              complaint guidance. How can I assist you today?
            </p>
          </div>

          {/* Chat messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "ml-auto text-sm sm:text-base bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  : "mr-auto text-sm sm:text-base bg-gray-300 dark:bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="mb-3 relative">
          <p className="text-sm sm:text-base font-medium mb-2 flex items-center gap-1">
            💡 Quick Questions:
          </p>

          {/* Left Scroll */}
          <button
            onClick={() => {
              const container = document.getElementById("quick-questions-container");
              container.scrollBy({ left: -150, behavior: "smooth" });
            }}
            className="absolute left-0 top-[40px] h-10 w-9 border border-pink-500 dark:border-purple-400 rounded-full p-2 shadow z-10 hidden sm:flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            &#8592;
          </button>

          {/* Questions */}
          <div
            id="quick-questions-container"
            className="flex overflow-x-auto whitespace-nowrap gap-3 pb-2 rounded-lg p-2 pl-0 pr-0 mx-auto scrollbar-hide"
            style={{ maxWidth: "94%" }}
          >
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="inline-block px-4 py-2 text-sm rounded-full border border-pink-500 text-pink-500 dark:border-purple-400 dark:text-purple-300 hover:bg-pink-100 dark:hover:bg-purple-800 transition"
                onClick={() => handleSend(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Right Scroll */}
          <button
            onClick={() => {
              const container = document.getElementById("quick-questions-container");
              container.scrollBy({ left: 150, behavior: "smooth" });
            }}
            className="absolute right-0 top-[40px] h-10 w-9 border border-pink-500 dark:border-purple-400 rounded-full p-2 shadow z-10 hidden sm:flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            &#8594;
          </button>
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the incident"
            className="flex-1 h-11 sm:h-14 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-2 pl-4 resize-none border border-gray-300 dark:border-gray-700 focus:border-pink-500 whitespace-pre-wrap no-scrollbar"
          />

          {/* Mic */}
          <button
            onClick={startListening}
            className={`p-3 sm:p-4 rounded-lg transition ${
              listening
                ? "bg-pink-500"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            }`}
          >
            <Mic className="w-4 h-5 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Send */}
          <button
            onClick={() => handleSend()}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-3 sm:py-4 sm:px-4 rounded-lg"
          >
            <Send className="w-4 h-5 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizenChat;
