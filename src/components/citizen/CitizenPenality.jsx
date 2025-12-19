import React, { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import penalties from "../../data/penalties.json";

const CitizenPenalty = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const normalize = (text) =>
    text.toLowerCase().replace(/[^a-z\s]/g, "").trim();

  const handleSearch = (e) => {
    e.preventDefault();

    const searchText = normalize(query);
    if (!searchText) return;

    // Filter offences that match the query partially or by word
    const matched = penalties.filter((off) => {
      const offenceName = normalize(off.name);
      if (offenceName.includes(searchText)) return true;

      const searchWords = searchText.split(" ");
      const offenceWords = offenceName.split(" ");
      return searchWords.some((word) => offenceWords.includes(word));
    });

    setResults(matched.length ? matched : [{ name: "Not Found", penalty: "No record available" }]);
  };

  return (
    <div className="fixed h-screen w-full pb-60 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="fixed left-0 w-full py-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow z-20">
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
          Penalty Checker
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-1">
          Know the fines and penalties for traffic offences in India
        </p>
      </div>

      {/* Main Content */}
      <div className="pt-40 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 h-full overflow-y-auto no-scrollbar">
        
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white dark:bg-gray-800 shadow rounded-full overflow-hidden mb-8"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search offence (e.g. seat belt, helmet, speeding)"
            className="flex-grow px-5 py-3 bg-transparent outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className={`grid gap-6 ${results.length === 1 ? "grid-cols-1" : "sm:grid-cols-2 md:grid-cols-2"}`}>
            {results.map((res, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h2 className="text-xl font-semibold">{res.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{res.penalty}</p>

                {res.description && (
                  <p className="text-gray-500 dark:text-gray-400 mt-2">{res.description}</p>
                )}

                {res.lawReference && (
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    <strong>Law:</strong> {res.lawReference}
                  </p>
                )}

                {res.typicalExamples && (
                  <ul className="list-disc list-inside text-left mt-4 text-gray-500 dark:text-gray-400">
                    {res.typicalExamples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Common Offences */}
        <div className=" rounded-xl shadow p-4 mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">
            Common Offences
          </h3>
          <div className="max-h-[360px] overflow-y-auto no-scrollbar px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {penalties.slice().map((off, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {off.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{off.penalty}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CitizenPenalty;
