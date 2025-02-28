import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "/src/services/api";

export default function Verify() {
  const [email, setEmail] = useState(""); 
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil email dari localStorage
    const storedEmail = localStorage.getItem("pending_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      alert("Email tidak ditemukan! Silakan registrasi ulang.");
      navigate("/register");
    }
  }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", { email, otp });

    if (!otp) {
      alert("Masukkan kode OTP!");
      return;
    }

    try {
      const response = await axios.post(
        "/verify-otp",
        { email, otp },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Verification success:", response.data);
      
      // Hapus email dari localStorage setelah sukses
      localStorage.removeItem("pending_email");

      alert("Verifikasi berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      console.error("Verification error:", error.response?.data || error.message);
      alert("Verifikasi gagal! Periksa kembali kode OTP.");
    }
  };

  return (
    <div>
      <h2>Verifikasi Akun</h2>
      <p>Masukkan kode OTP yang telah dikirim ke email: <b>{email}</b></p>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Masukkan OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verifikasi</button>
      </form>
    </div>
  );
}
