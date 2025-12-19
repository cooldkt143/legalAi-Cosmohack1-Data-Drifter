import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import legalData from "../../data/legal.json";

const getUsageColor = (usage) => {
  switch (usage) {
    case "high":
      return "bg-green-600";
    case "medium":
      return "bg-blue-600";
    case "low":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const CitizenRights = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = legalData.filter((section) =>
    `${section.category} ${section.section} ${section.title} ${section.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed left-1 lg:left-5 w-[98%] h-screen flex flex-col px-2 sm:px-2 lg:px-2 pt-2 pb-60 lg:pb-0">
      {/* Search bar (fixed at top) */}
      <div className="relative w-full mb-4 flex-shrink-0">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search your rights ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                     text-gray-900 dark:text-gray-100 placeholder-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Legal Sections (scrollable, scrollbar hidden) */}
      <div
        className="flex-1 overflow-y-auto space-y-4 pb-6 lg:pb-60"
        style={{
          scrollbarWidth: "none", // Firefox
        }}
      >
        {/* Hide scrollbar for Chrome, Safari and Edge */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {filteredSections.map((section, idx) => (
          <div
            key={idx}
            className="w-full rounded-lg bg-gray-100 dark:bg-gray-900 
                       border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="flex justify-between items-center w-full px-4 py-3"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold text-white ${getUsageColor(
                      section.usage
                    )}`}
                  >
                    {section.usage} usage
                  </span>
                </div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 text-left">
                  {section.title}
                </h2>
              </div>

              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {openIndex === idx && (
              <div className="px-4 pb-4 text-sm text-gray-700 dark:text-gray-300">
                {section.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitizenRights;