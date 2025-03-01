import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "/src/services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });

    try {
      const response = await axios.post("/login", { email, password });
      console.log("Login success:", response.data);

      localStorage.setItem("token", response.data.token);
      alert("Login berhasil!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login gagal! Periksa kembali email dan password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p>
        <a href="#" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </a>
      </p>
    </div>
  );
}
