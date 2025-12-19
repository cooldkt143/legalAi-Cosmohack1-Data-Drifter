// src/components/citizen/CitizenProfile.jsx
import React from "react";

const CitizenProfile = ({ user }) => {
  // Sample user data if not passed as prop
  const defaultUser = {
    name: "Simran Patra",
    email: "simran@example.com",
    location: "Odisha, India",
    joinDate: "2023-01-15",
    history: ["Logged in", "Viewed Discover page", "Saved a monument"],
  };

  const profileUser = user || defaultUser;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 p-6">
      {/* Profile Card */}
      <div className="w-full mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 mt-12">
        {/* Header */}
        <div className="flex items-center mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 mr-4 flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold">{profileUser.name}</h1>
            <p className="text-gray-700 dark:text-gray-300">{profileUser.email}</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold border-b pb-2 mb-3 border-gray-300 dark:border-gray-600">
            Profile Details
          </h2>
          <p>
            <span className="font-semibold">Location:</span> {profileUser.location}
          </p>
          <p>
            <span className="font-semibold">Joined On:</span> {profileUser.joinDate}
          </p>
        </div>

        {/* History / Activity */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-3 border-gray-300 dark:border-gray-600">
            History / Activity
          </h2>
          {profileUser.history && profileUser.history.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {profileUser.history.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          ) : (
            <p>No history yet.</p>
          )}
        </div>

        {/* Settings */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold border-b pb-2 mb-3 border-gray-300 dark:border-gray-600">
            Settings
          </h2>
          <p>
            <span className="font-semibold">Theme:</span> controlled externally
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;
