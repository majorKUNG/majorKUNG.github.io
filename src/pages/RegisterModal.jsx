import { useState } from "react";
import "./login.css"; // Återanvänd login-stilarna

export default function RegisterModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    managerName: "",
    region: "",
    teamName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Registering user with data:", formData); // DEBUG

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Register response:", data); // DEBUG

      if (response.ok) {
        onSuccess();
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="login-box">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="managerName"
            placeholder=" Manager Name"
            className="login-input"
            onChange={handleChange}
          />
          <select
            name="region"
            className="login-input"
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select Region
            </option>
            <option>Sweden</option>
            <option>Finland</option>
            <option>Denmark</option>
            <option>USA</option>
            <option>Canada</option>
          </select>
          <input
            name="teamName"
            placeholder=" Team Name"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder=" Email"
            type="email"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder=" Password"
            type="password"
            className="login-input"
            onChange={handleChange}
          />

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button" style={{ width: "100%" }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
