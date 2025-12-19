// src/components/citizen/CitizenPenalty.jsx
import React, { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import penalties from "../../data/penalties.json";

const CitizenPenalty = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = penalties.find(
      (off) => off.name.toLowerCase() === query.trim().toLowerCase()
    );
    setResult(match || { name: "Not Found", penalty: "No record available" });
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 overflow-x-hidden">
      {/* Header Section */}
      <div className="fixed w-full py-12 text-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-10">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
          Penalty Checker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Know the fines & penalties for traffic and legal offences in India.
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 pt-[200px] pb-20">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white dark:bg-gray-800 shadow-md rounded-full overflow-hidden mb-8 w-full mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search offence (e.g. No Helmet, Over Speeding)"
            className="flex-grow px-5 py-3 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white transition"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Search Result */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center w-full mx-auto">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{result.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {result.penalty}
            </p>
            {result.description && (
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {result.description}
              </p>
            )}
            {result.lawReference && (
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                <strong>Law Reference:</strong> {result.lawReference}
              </p>
            )}
            {result.typicalExamples && (
              <div className="text-left mt-4">
                <strong className="text-gray-700 dark:text-gray-300">
                  Typical Examples:
                </strong>
                <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 mt-1">
                  {result.typicalExamples.map((ex, idx) => (
                    <li key={idx}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Default Text */}
        {!result && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Type an offence name to see its penalty details.
          </div>
        )}

        {/* Common Offences Section */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Common Offences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {penalties.slice(0, 6).map((off, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {off.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                  {off.penalty}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPenalty;
