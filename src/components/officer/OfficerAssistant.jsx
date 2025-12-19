import React, { useState, useRef, useEffect } from "react";
import { Mic, Send } from "lucide-react";

const OfficerAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);
  const chatRef = useRef(null);

  // Helper to clean markdown
  const cleanMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*/g, "")        // remove **
      .replace(/__/g, "")          // remove __
      .replace(/[_*`#>-]/g, "");   // remove markdown chars
  }

  // Gemini API ---- using .env
  const generateAIResponse = async (promptText) => {
    try {
      setLoading(true);

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptText }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const rawText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response generated.";

      // Clean markdown before returning
      return cleanMarkdown(rawText);

    } catch (error) {
      return "Error generating response.";
    } finally {
      setLoading(false);
    }
  };

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // AI placeholder
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + 1, text: "Thinking...", sender: "ai" },
    ]);

    const response = await generateAIResponse(userMessage.text);

    // Replace placeholder
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        id: Date.now() + 2,
        text: response,
        sender: "ai",
      };
      return updated;
    });
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

  return (
    <div className="fixed pt-10 w-full pb-40 pr-10 no-scrollbar h-[calc(100vh-4rem)]">
      <div className="w-full h-[105%] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="bg-blue-600 p-2 rounded-full text-white">🎯</span>
            AI-Powered Incident Analysis
          </h2>
          <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full">
            Beta
          </span>
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto no-scrollbar mb-4 p-3 space-y-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] p-3 rounded-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-gray-300 dark:bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="relative flex-shrink-0">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the incident in detail..."
            className="w-full h-20 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4 pr-12 resize-none border border-gray-300 dark:border-gray-700 focus:border-blue-500 whitespace-pre-wrap no-scrollbar"
          />

          <button
            onClick={startListening}
            className={`absolute bottom-3 right-3 p-2 rounded-lg transition ${
              listening ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>

        <button
          onClick={handleSend}
          disabled={loading}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex-shrink-0"
        >
          <Send className="w-5 h-5" />
          {loading ? "Analyzing..." : "Analyze Incident with AI"}
        </button>
      </div>
    </div>
  );
};

export default OfficerAssistant;