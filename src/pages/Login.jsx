import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";
import "./login.css";

export default function Login() {
  const [managerName, setManagerName] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setSuccessMessage("");

    if (!managerName|| !password) {
      setError("Enter both manager name and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerName, password }), // ✅ matchar backend
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.userId); 
        localStorage.setItem("teamId", data.teamId);
        localStorage.setItem("userName", managerName);
        localStorage.setItem("userPassword", password);

        navigate("/office");
        
      } else {
        setError(
          data.error ||
            "Wrong Manager Name or Password. Have you Registered?"
        );
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setSuccessMessage("🎉 Registered successfully! You can now log in.");
    setError("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Manager Login</h2>

        <input
          type="text"
          className="login-input"
          placeholder="Manager Name"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="login-error">{error}</div>}
        {successMessage && (
          <div className="login-success">{successMessage}</div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleLogin} className="login-button">
            Log in
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="login-button"
          >
            Register Now
          </button>
        </div>
      </div>

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}
    </div>
  );
}
