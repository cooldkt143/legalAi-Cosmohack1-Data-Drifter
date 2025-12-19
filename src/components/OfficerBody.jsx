import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OfficerHeader from "../components/OfficerHeader";
import OfficerAssistant from "./officer/OfficerAssistant";
import OfficerGenerate from "./officer/OfficerGenerate";
import OfficerRecord from "./officer/OfficerRecord";
import OfficerLegal from "./officer/OfficerLegal";
import OfficerProfile from "./officer/OfficerProfile";

const OfficerBody = () => {
  const tabs = [
    { name: "Assistant", component: <OfficerAssistant /> },
    { name: "Generate", component: <OfficerGenerate /> },
    { name: "Record", component: <OfficerRecord /> },
    { name: "Legal", component: <OfficerLegal /> },
    { name: "Profile", component: <OfficerProfile /> },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors pt-20 mt-20 overflow-auto hide-scrollbar"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <OfficerHeader />

      {/* Tabs */}
      <div className="fixed top-30 lg:top-40 left-0 w-full flex border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 z-20">
        {tabs.map((tab) => (
          <motion.button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex-1 text-center px-4 py-3 font-medium text-xs sm:text-sm transition rounded-t-md
              ${
                activeTab === tab.name
                  ? "bg-blue-500 text-white dark:bg-blue-600 shadow"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {tab.name}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.name && (
                <motion.div
                  key={tab.name}
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {tab.component}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OfficerBody;
