import React, { useState, useEffect } from "react";
import { CheckCircle, Trash2 } from "lucide-react";

const CitizenComplaint = () => {
  const [firNumber, setFirNumber] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [complainant, setComplainant] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
  });
  const [complaintType, setComplaintType] = useState("");
  const [customComplaintType, setCustomComplaintType] = useState("");
  const [errors, setErrors] = useState({});
  const [drafts, setDrafts] = useState([]);

  const generateFirNumber = () => {
    const now = new Date();
    const base = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 12);
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `FIR-${base}${seconds}`;
  };

  useEffect(() => setFirNumber(generateFirNumber()), []);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/drafts");
        const data = await res.json();
        setDrafts(data);
      } catch (error) {
        console.error("Error fetching drafts:", error);
      }
    };
    fetchDrafts();
    const interval = setInterval(fetchDrafts, 3000);
    return () => clearInterval(interval);
  }, []);

  const validateFields = () => {
    const tempErrors = {};
    ["name", "address", "phone"].forEach((field) => {
      if (!complainant[field].trim()) tempErrors[field] = true;
    });
    if (!dateTime.trim()) tempErrors.dateTime = true;
    if (!complainant.description.trim()) tempErrors.description = true;
    if (!complaintType.trim()) tempErrors.complaintType = true;
    if (complaintType === "other" && !customComplaintType.trim())
      tempErrors.customComplaintType = true;

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleGenerateFIR = async () => {
    if (!validateFields())
      return alert("⚠️ Please fill all required fields before generating FIR.");

    const selectedType =
      complaintType === "other" ? customComplaintType : complaintType;

    const newFIR = {
      firNumber,
      dateTime,
      complainant,
      complaintType: selectedType,
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("http://localhost:5000/api/firs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFIR),
      });
      const data = await res.json();
      alert(data.message);

      setFirNumber(generateFirNumber());
      setComplainant({ name: "", address: "", phone: "", description: "" });
      setComplaintType("");
      setCustomComplaintType("");
      setDateTime("");
      setErrors({});
    } catch (error) {
      console.error("Error saving FIR:", error);
      alert("❌ Error saving FIR. Check server connection.");
    }
  };

  const handleDeleteDraft = async (firNumberToDelete) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/drafts/${firNumberToDelete}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      alert(data.message);
      setDrafts((prev) =>
        prev.filter((d) => d.firNumber !== firNumberToDelete)
      );
    } catch (error) {
      console.error("Error deleting draft:", error);
      alert("❌ Error deleting draft. Check server connection.");
    }
  };

  return (
    <div className="pt-4 w-[97%] sm:w-[99%] space-y-10 pb-20 pl-3 sm:pl-5">
      {/* FIR Form */}
      <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-green-600 p-2 rounded-full text-white flex items-center justify-center">
            <span className="material-icons text-white">edit</span>
          </span>
          <h2 className="text-xl font-semibold tracking-wide">
            File a Complaint
          </h2>
        </div>

        {/* FIR Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">FIR Number</label>
            <input
              type="text"
              value={firNumber}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.dateTime
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-500`}
            />
          </div>
        </div>

        {/* Complainant Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Complainant Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["name", "address", "phone"].map((field, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Enter ${field}`}
                value={complainant[field]}
                onChange={(e) =>
                  setComplainant({ ...complainant, [field]: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[field]
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-500`}
              />
            ))}
          </div>
        </div>

        {/* Complaint Type */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Complaint Type</h3>

          <div className="flex flex-col md:flex-row gap-4 transition-all duration-300">
            <div
              className={`transition-all duration-300 ${
                complaintType === "other" ? "md:w-1/2" : "w-full"
              }`}
            >
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.complaintType
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-500`}
              >
                <option value="">Select Complaint Type</option>
                <option value="theft">Theft</option>
                <option value="fraud">Fraud</option>
                <option value="harassment">Harassment</option>
                <option value="traffic-violence">Traffic Violence</option>
                <option value="cyber-crime">Cyber Crime</option>
                <option value="murder">Murder</option>
                <option value="other">Other</option>
              </select>
            </div>

            {complaintType === "other" && (
              <input
                type="text"
                placeholder="Specify other complaint type"
                value={customComplaintType}
                onChange={(e) => setCustomComplaintType(e.target.value)}
                className={`transition-all duration-300 md:w-1/2 px-4 py-2 rounded-lg border ${
                  errors.customComplaintType
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-500`}
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Incident Description</h3>
          <textarea
            placeholder="Provide a detailed description of the incident..."
            value={complainant.description}
            onChange={(e) =>
              setComplainant({ ...complainant, description: e.target.value })
            }
            className={`w-full h-36 px-4 py-3 rounded-lg border ${
              errors.description
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-700"
            } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none resize-none focus:border-blue-500 dark:focus:border-blue-500`}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleGenerateFIR}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
          >
            <CheckCircle className="w-5 h-5" /> Generate FIR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitizenComplaint;