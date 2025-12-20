// src/components/citizen/CitizenProfile.jsx
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const CitizenProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Citizen",
          email: currentUser.email,
          photo: currentUser.photoURL,
          provider: currentUser.providerData[0]?.providerId,
          joinedOn: currentUser.metadata.creationTime,
          lastLogin: currentUser.metadata.lastSignInTime,
        });
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-700 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6">
      <div className="w-full mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 mt-6 sm:mt-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div className="flex items-center gap-4">
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 dark:bg-gray-700" />
            )}

            <div>
              <h1 className="text-lg sm:text-2xl font-bold">{user.name}</h1>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {user.email}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 
                       text-white rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>

        {/* Profile Details */}
        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-3 border-gray-300 dark:border-gray-600">
            Profile Details
          </h2>
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Login Provider:</span> {user.provider}
          </p>
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Account Created:</span> {user.joinedOn}
          </p>
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Last Login:</span> {user.lastLogin}
          </p>
        </div>

        {/* History */}
        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-3 border-gray-300 dark:border-gray-600">
            History / Activity
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            No activity recorded yet.
          </p>
        </div>

        {/* Settings */}
        <div className="mt-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-3 border-gray-300 dark:border-gray-600">
            Settings
          </h2>
          <p className="text-sm sm:text-base">
            <span className="font-semibold">Theme:</span> controlled externally
          </p>
        </div>

      </div>
    </div>
  );
};

export default CitizenProfile;
