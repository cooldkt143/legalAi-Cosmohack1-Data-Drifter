import React, { useState, useEffect } from "react";
import { CheckCircle, Trash2 } from "lucide-react";

const OfficerGenerate = () => {
  const [firNumber, setFirNumber] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [complainant, setComplainant] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [drafts, setDrafts] = useState([]);

  const generateFirNumber = () => {
    const now = new Date();
    const base = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 12);
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `FIR-${base}${seconds}`;
  };

  useEffect(() => setFirNumber(generateFirNumber()), []);

  // Fetch drafts every 3 seconds
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
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleGenerateFIR = async () => {
    if (!validateFields())
      return alert("⚠️ Please fill all required fields before generating FIR.");

    const newFIR = {
      firNumber,
      dateTime,
      complainant,
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
      setDateTime("");
      setErrors({});
    } catch (error) {
      console.error("Error saving FIR:", error);
      alert("❌ Error saving FIR. Check server connection.");
    }
  };

  const handleSaveDraft = async () => {
    const draft = {
      firNumber: generateFirNumber(),
      dateTime,
      complainant,
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("http://localhost:5000/api/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      alert(data.message);
      setFirNumber(generateFirNumber());
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("❌ Error saving draft. Check server connection.");
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
    <div className="pt-10 w-full space-y-10">
      {/* FIR Form */}
      <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex items-center gap-2 mb-6">
          <span className="bg-green-600 p-2 rounded-full text-white flex items-center justify-center">
            <span className="material-icons text-white">edit</span>
          </span>
          <h2 className="text-lg font-semibold">Smart FIR Generator</h2>
        </div>

        {/* FIR Number & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                errors.dateTime ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors`}
            />
          </div>
        </div>

        <h3 className="text-md font-semibold mb-2">Complainant Details</h3>
        <div className="space-y-3 mb-6">
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
                errors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors`}
            />
          ))}
        </div>

        <h3 className="text-md font-semibold mb-2">Incident Description</h3>
        <textarea
          placeholder="Detailed description of the incident..."
          value={complainant.description}
          onChange={(e) =>
            setComplainant({ ...complainant, description: e.target.value })
          }
          className={`w-full h-32 lg:h-40 px-4 py-3 rounded-lg border ${
            errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none resize-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors mb-6`}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleGenerateFIR}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition"
          >
            <CheckCircle className="w-5 h-5" /> Generate FIR
          </button>
          <button
            onClick={handleSaveDraft}
            className="flex-1 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium py-3 rounded-lg transition"
          >
            Save Template Draft
          </button>
        </div>
      </div>

      {/* Draft Section */}
      <div className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
        <h2 className="text-lg font-semibold mb-4">Drafted FIRs</h2>
        {drafts.length === 0 ? (
          <p className="text-gray-500">No drafts available.</p>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
            {drafts.map((draft, index) => (
              <div
                key={index}
                className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 flex justify-between items-start"
              >
                <div>
                  <p><strong>FIR Number:</strong> {draft.firNumber}</p>
                  <p><strong>Date:</strong> {draft.dateTime || "Not specified"}</p>
                  <p><strong>Name:</strong> {draft.complainant.name}</p>
                  <p><strong>Address:</strong> {draft.complainant.address}</p>
                  <p><strong>Phone:</strong> {draft.complainant.phone}</p>
                  <p><strong>Description:</strong> {draft.complainant.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteDraft(draft.firNumber)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerGenerate;
