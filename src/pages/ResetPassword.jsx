import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "/src/services/api";

export default function ResetPassword() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Ambil email dari localStorage
    const storedEmail = localStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      alert("Email tidak ditemukan, silakan ulangi proses reset password.");
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    console.log("Resetting password for:", email);

    if (!newPassword || !confirmPassword) {
      alert("Semua field harus diisi!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    try {
      const response = await axios.post("/reset_password", { email, newPassword });
      console.log("Password reset success:", response.data);

      alert("Password berhasil diubah! Silakan login.");

      // Hapus email dari localStorage setelah reset berhasil
      localStorage.removeItem("resetEmail");

      navigate("/login");
    } catch (error) {
      console.error("Reset error:", error.response?.data || error.message);
      alert("Gagal mengubah password. Coba lagi.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input type="email" value={email} disabled />
        <input
          type="password"
          placeholder="Password Baru"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Konfirmasi Password Baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Ubah Password</button>
      </form>
    </div>
  );
}
