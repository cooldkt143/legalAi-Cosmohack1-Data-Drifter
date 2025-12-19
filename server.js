// server.js (ES module version)
import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Ensure the data folder exists
const dataDir = path.join(__dirname, "src", "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const draftsFile = path.join(dataDir, "draftfir.json");
const firsFile = path.join(dataDir, "record.json");

// Initialize files if missing
[draftsFile, firsFile].forEach((file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]", "utf8");
});

// Helper to read JSON file
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

// Helper to write JSON file
const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// ======================= Draft FIR Routes =======================

// GET all drafts
app.get("/api/drafts", (req, res) => {
  const drafts = readJSON(draftsFile);
  console.log("GET /api/drafts ->", drafts.length, "drafts"); 
  res.json(drafts);
});

// POST a new draft
app.post("/api/drafts", (req, res) => {
  const drafts = readJSON(draftsFile);
  drafts.push(req.body);
  writeJSON(draftsFile, drafts);
  console.log("POST /api/drafts -> draft added");
  res.json({ message: "📝 Draft FIR saved successfully!" });
});

// DELETE a draft by FIR number
app.delete("/api/drafts/:firNumber", (req, res) => {
  const { firNumber } = req.params;
  let drafts = readJSON(draftsFile);

  const initialLength = drafts.length;
  drafts = drafts.filter((d) => d.firNumber !== firNumber);

  if (drafts.length === initialLength) {
    return res.status(404).json({ message: "Draft not found" });
  }

  writeJSON(draftsFile, drafts);
  console.log(`DELETE /api/drafts/${firNumber} -> deleted`);
  res.json({ message: "🗑 Draft deleted successfully!" });
});

// ======================= FIR Routes =======================

// GET all FIRs
app.get("/api/firs", (req, res) => {
  const firs = readJSON(firsFile);
  res.json(firs);
});

// POST a new FIR
app.post("/api/firs", (req, res) => {
  const firs = readJSON(firsFile);
  firs.push(req.body);
  writeJSON(firsFile, firs);
  res.json({ message: "✅ FIR generated successfully!" });
});

// ======================= Start Server =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// ======================= End of server.js =======================