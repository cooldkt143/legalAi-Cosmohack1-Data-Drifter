import React from "react";
import { motion } from "framer-motion";
import { Shield, User, ArrowRight } from "lucide-react";
import logo from "../assets/images/logo.png";
import ThemeToggle from "../components/themeToggle";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 
                 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
                 dark:from-gray-900 dark:via-slate-900 dark:to-black 
                 relative overflow-hidden transition-colors duration-500 
                 text-gray-900 dark:text-white"
    >
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Logo + Title */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center mb-8 sm:mb-10 text-center"
      >
        <div className="rounded-full mb-4 shadow-lg">
          <motion.img
            src={logo}
            alt="LegalAI Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover 
                       shadow-md border border-gray-300 dark:border-gray-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">LegalAI FIR Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
          AI-Powered Legal Intelligence
        </p>
      </motion.div>

      {/* Card Options */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="space-y-4 sm:space-y-6 w-full max-w-md"
      >
        {/* Police Officer Card */}
        <motion.button         
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="w-full flex items-center gap-3 sm:gap-4
                     bg-white/20 dark:bg-blue-900/30
                     backdrop-blur-md
                     border border-white/30 dark:border-blue-800/50
                     p-4 sm:p-5 rounded-xl shadow-lg
                     transition-all duration-300 text-left
                     hover:shadow-2xl"
          onClick={() => navigate("/officerLogin")}
        >
          <div className="bg-blue-600/10 p-2 sm:p-3 rounded-full flex-shrink-0 backdrop-blur-sm">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-base sm:text-lg">Police Officer</h2>
            <p className="text-gray-900 dark:text-gray-200 text-xs sm:text-sm">
              Advanced FIR tools, case management, and legal database access
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-black/80 dark:text-white/80" />
        </motion.button>

        {/* Citizen Card */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
          className="w-full flex items-center gap-3 sm:gap-4
                     bg-white/20 dark:bg-green-900/30
                     backdrop-blur-md
                     border border-white/30 dark:border-green-800/50
                     p-4 sm:p-5 rounded-xl shadow-lg
                     transition-all duration-300 text-left
                     hover:shadow-2xl"
          onClick={() => navigate("/citizenLogin")}
        >
          <div className="bg-green-600/10 p-2 sm:p-3 rounded-full flex-shrink-0 backdrop-blur-sm">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-base sm:text-lg">Citizen</h2>
            <p className="text-gray-900 dark:text-gray-200 text-xs sm:text-sm">
              File complaints, know your rights, and get instant legal guidance
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-black/80 dark:text-white/80" />
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-6 text-center 
                      text-gray-600 dark:text-gray-400 
                      text-xs sm:text-sm px-2"
      >
        <p>
          <span className="text-green-500">●</span> Secure • AI-Powered • 24/7 Available
        </p>
        <p>Trusted by 10,000+ users nationwide</p>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
