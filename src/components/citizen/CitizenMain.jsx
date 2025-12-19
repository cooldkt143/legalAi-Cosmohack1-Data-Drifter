import React from "react";
import {
  Star,
  FileText,
  Shield,
  AlertCircle,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import ThemeToggle from "../themeToggle";

const CitizenMain = () => {
  const quickActions = [
    {
      title: "File a Complaint",
      description: "Report incidents with AI assistance",
      badge: "24/7 Available",
      status: "Available",
      iconBg: "bg-blue-500",
      icon: FileText,
    },
    {
      title: "Know Your Rights",
      description: "Learn your legal rights & protections",
      badge: "50+ Rights Covered",
      status: "Available",
      iconBg: "bg-green-500",
      icon: Shield,
    },
    {
      title: "Penalty Checker",
      description: "Check fines & penalties instantly",
      badge: "Updated Daily",
      status: "Available",
      iconBg: "bg-orange-500",
      icon: AlertCircle,
    },
  ];

  return (
    <div
      className="fixed top-1 lg:top-0 w-full h-[80vh] text-gray-900 dark:text-gray-100 transition-colors relative overflow-y-auto pb-10 no-scrollbar"
    >
      {/* Header / Welcome Card */}
      <div className="w-full px-4 py-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 sm:p-8 text-white w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
            <Shield className="w-7 h-7" />
            Welcome to LegalAI
          </h1>
          <p className="text-sm sm:text-base opacity-90">
            Your intelligent legal companion
          </p>

          {/* Rating and trust badge */}
          <div className="flex items-center gap-3 mt-4 text-sm">
            <div className="flex text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-300" />
              ))}
            </div>
            <p className="opacity-90">Trusted by 10K+ users</p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <h2 className="text-lg font-semibold mt-8 mb-4">Quick Actions</h2>

        <div className="space-y-4 w-full">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition rounded-xl p-4 sm:p-5 shadow-sm w-full"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-lg ${action.iconBg} bg-opacity-90 text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      {action.title}
                    </h3>
                    <p className="text-sm opacity-80">{action.description}</p>

                    <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm">
                      <span className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        {action.badge}
                      </span>
                      <span className="flex items-center gap-1 text-green-500">
                        <CheckCircle className="w-3 h-3" /> {action.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-gray-500 dark:text-gray-400 text-lg">{">"}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Custom style to hide scrollbar
const style = document.createElement("style");
style.innerHTML = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
document.head.appendChild(style);

export default CitizenMain;
