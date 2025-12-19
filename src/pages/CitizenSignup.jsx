import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/themeToggle";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const CitizenSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the display name
      await updateProfile(userCredential.user, { displayName: name });
      console.log("Signup successful:", userCredential.user);
      navigate("/citizenHome");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google signup successful");
      navigate("/citizenHome");
    } catch (err) {
      console.error("Google signup error:", err.message);
      setError("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
                    dark:from-gray-900 dark:via-slate-900 dark:to-black
                    relative overflow-hidden transition-colors duration-500
                    text-gray-900 dark:text-white px-4 sm:px-6">
      <ThemeToggle />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50
                   backdrop-blur-xl p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md relative"
        style={{
          boxShadow:
            "0 8px 30px rgba(59, 130, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.2) inset, 0 0 20px rgba(239, 68, 68, 0.2)",
        }}
      >
        {/* Animated User Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
          className="mx-auto mb-4 w-16 h-16 flex items-center justify-center
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
        >
          <User className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Citizen Signup
        </h2>

        {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}

        {/* Google Signup */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition font-medium mb-4"
        >
          <User className="w-5 h-5" />
          Sign up with Google
        </motion.button>

        <div className="flex items-center justify-center my-4">
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        {/* Email Signup */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2">
              <User className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">Email</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2">
              <Mail className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">Password</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2">
              <Lock className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">Confirm Password</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2">
              <Check className="text-gray-500 w-4 h-4 mr-2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition font-medium"
          >
            <User className="w-5 h-5" />
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/citizenLogin")}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default CitizenSignup;
