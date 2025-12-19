import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import OfficerLogin from "./pages/OfficerLogin";
import OfficerHome from "./pages/OfficerHome";
import CitizenLogin from "./pages/CitizenLogin";
import CitizenHome from "./pages/CitizenHome"; 
import CitizenSignup from "./pages/CitizenSignup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root / Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Officer's Page */}
        <Route path="/officerLogin" element={<OfficerLogin />} />
        <Route path="/officerHome" element={<OfficerHome />} />

        {/* Citizen's Page */}
        <Route path="/citizenLogin" element={<CitizenLogin />} />
        <Route path="/citizenSignup" element={<CitizenSignup />} />
        <Route path="/citizenHome" element={<CitizenHome />} />

        {/* Catch-all for invalid URLs (optional) */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
