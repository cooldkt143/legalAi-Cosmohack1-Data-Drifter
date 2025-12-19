import React, { useEffect, useState } from "react";
import ThemeToggle from "../themeToggle"; // adjust path if needed
import policeProfileImage from "../../assets/images/policeProfileImage.png";
import recordDetails from "../../data/recorddetails.json"; // Import JSON data

const OfficerProfile = () => {
  const [firRecords, setFirRecords] = useState([]);

  useEffect(() => {
    // Load data from the imported JSON file
    setFirRecords(recordDetails);
  }, []);

  const officer = {
    name: "Inspector Rajesh Kumar",
    rank: "Senior Police Officer",
    batch: "UP12-2105",
    station: "Gorakhpur Police Station",
    email: "rajesh.kumar@police.in",
    phone: "+91 9876543210",
    achievements: [
      "Awarded for bravery in 2021 for solving a major theft case",
      "Led a successful cybercrime investigation team",
      "Received the President’s Medal for meritorious service",
    ],
  };

  return (
    <div className="fixed inset-1 top-60 flex flex-col sm:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      {/* Left Section - Image */}
      <div className="w-full sm:w-1/3 h-[30vh] sm:h-full flex-shrink-0">
        <img
          src={policeProfileImage}
          alt="Officer Profile"
          className="w-full h-full object-cover sm:rounded-lg"
        />
      </div>

      {/* Right Section - Scrollable Only */}
      <div
        className="flex-1 flex flex-col text-gray-800 dark:text-gray-200 
                   overflow-y-auto p-6 sm:p-10 h-[70vh] sm:h-screen pb-20 sm:pb-80"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Hide scrollbar for Chrome, Safari, and Edge */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {/* Officer Details */}
        <div className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{officer.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{officer.rank}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">{officer.batch}</p>
          <p className="mt-2 text-sm sm:text-base">
            <strong>Station:</strong> {officer.station}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Email:</strong> {officer.email}
          </p>
          <p className="text-sm sm:text-base">
            <strong>Phone:</strong> {officer.phone}
          </p>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">Achievements</h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
            {officer.achievements.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FIR Records */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">FIR Records</h2>
          <div className="space-y-4">
            {firRecords.map((record, index) => (
              <div
                key={index}
                className="border border-gray-300 dark:border-gray-700 rounded-xl p-4 
                           bg-white dark:bg-gray-800 shadow-sm text-sm sm:text-base hover:shadow-md transition-shadow"
              >
                <p>
                  <strong>FIR Number:</strong> {record.firNumber}
                </p>
                <p>
                  <strong>Description:</strong> {record.description}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      record.status === "Closed"
                        ? "text-green-600"
                        : record.status === "Ongoing"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    } font-medium`}
                  >
                    {record.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-10" /> {/* bottom spacing */}
      </div>
    </div>
  );
};

export default OfficerProfile;