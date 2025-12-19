import React, { useEffect, useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import ThemeToggle from "./themeToggle";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CitizenHeader = ({ user }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  // Greeting logic
  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 13) return "Good Noon";
    if (hour >= 13 && hour < 18) return "Good Afternoon";
    if (hour >= 18 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const date = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setCurrentTime(`${time} • ${date}`);

      const hour = now.getHours();
      setGreeting(getGreeting(hour));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full px-4 sm:px-8 py-4 sm:py-6 
                 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 
                 dark:from-gray-900 dark:via-black dark:to-gray-900
                 text-gray-900 dark:text-white shadow-md transition-colors duration-500"
    >
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between w-full lg:h-[60px]">
        {/* Left Section */}
        <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
          <ArrowLeft className="w-5 h-5 hover:text-blue-600 dark:hover:text-blue-400" />
          <div>
            <h2 className="font-semibold text-sm sm:text-base">
              {greeting}, {user?.name || "User"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {user?.email || "user@emil.com"}
            </p>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="mx-auto mb-2 w-10 h-10 flex items-center justify-center
                       bg-gradient-to-r from-blue-600 to-red-600 rounded-full shadow-lg"
          >
            <motion.div
              animate={{ color: ["#ffffff", "#93c5fd", "#ffffff", "#fca5a5", "#ffffff"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <User className="w-5 h-5" />
            </motion.div>
          </motion.div>
          <h1 className="font-bold text-lg sm:text-xl">LegalAI FIR Assistant</h1>
          <span className="text-xs text-green-600 dark:text-green-400">● Professional Mode</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 pt-16">
          <p className="text-sm text-blue-600 dark:text-blue-400">{currentTime}</p>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden w-full gap-3 h-[140px]">
        {/* Top - User Icon + Name */}
        <div className="flex items-center gap-2 pt-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="w-9 h-9 flex items-center justify-center
                       bg-gradient-to-r from-blue-600 to-red-600 rounded-full shadow-lg"
          >
            <motion.div
              animate={{ color: ["#ffffff", "#93c5fd", "#ffffff", "#fca5a5", "#ffffff"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <User className="w-5 h-5" />
            </motion.div>
          </motion.div>
          <div className="flex flex-col">
            <h1 className="font-bold text-base">LegalAI FIR Assistant</h1>
            <span className="text-xs text-green-600 dark:text-green-400">
              ● Citizen Mode
            </span>
          </div>
        </div>

        {/* Bottom - Greeting + Clock */}
        <div className="flex items-center justify-between w-full pt-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5 hover:text-blue-600 dark:hover:text-blue-400" />
            <div>
              <h2 className="font-semibold text-sm">{greeting}, {user?.name || "User"}</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-blue-600 dark:text-blue-400">{currentTime}</p>
            <ThemeToggle className="p-2"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CitizenHeader;