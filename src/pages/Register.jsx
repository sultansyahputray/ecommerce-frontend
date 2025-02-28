import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "/src/services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register attempt:", { name, email, password, confirmPassword });

    if (!name || !email || !password || !confirmPassword) {
      alert("Semua field harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    try {
      const response = await axios.post(
        "/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Register success:", response.data);

      localStorage.setItem("pending_email", email);

      alert("Registrasi berhasil! Silakan cek email untuk verifikasi.");
      navigate("/verify");
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      alert("Registrasi gagal! Coba gunakan email lain.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
