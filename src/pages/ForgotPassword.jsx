import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "/src/services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Requesting reset password for:", email);

    try {
      const response = await axios.post("/request_reset_password", { email });
      console.log("Reset request success:", response.data);

      // Simpan email ke localStorage agar bisa digunakan di step berikutnya
      localStorage.setItem("resetEmail", email);

      alert("Kode verifikasi telah dikirim ke email Anda.");
      navigate("/verify-reset"); // Tidak perlu mengirim state, karena sudah tersimpan di localStorage
    } catch (error) {
      console.error("Reset request error:", error.response?.data || error.message);
      alert("Gagal mengirim kode verifikasi. Coba lagi.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Masukkan email Anda untuk menerima kode verifikasi.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Kirim OTP</button>
      </form>
    </div>
  );
}
