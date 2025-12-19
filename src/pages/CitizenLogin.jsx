import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/themeToggle";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const CitizenLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Email login successful");
      navigate("/citizenHome");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google login successful");
      navigate("/citizenHome");
    } catch (err) {
      console.error("Google login error:", err.message);
      setError("Google login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
      dark:from-gray-900 dark:via-slate-900 dark:to-black
      relative overflow-hidden transition-colors duration-500
      text-gray-900 dark:text-white px-4 sm:px-6"
    >
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
          Citizen Login
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition font-medium mb-4"
        >
          <User className="w-5 h-5" />
          Sign in with Google
        </motion.button>

        <div className="flex items-center justify-center my-4">
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
              Email
            </label>
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
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-1">
              Password
            </label>
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

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl transition font-medium"
          >
            <LogIn className="w-5 h-5" />
            Login
          </motion.button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/citizenSignup")}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default CitizenLogin;
