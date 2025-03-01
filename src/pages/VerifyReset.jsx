import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "/src/services/api";

export default function VerifyReset() {
  const [otp, setOtp] = useState("");
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

  const handleVerify = async (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);

    if (!otp) {
      alert("Masukkan kode OTP!");
      return;
    }

    try {
      const response = await axios.post("/verify_reset_password", { email, otp });
      console.log("Verification success:", response.data);

      alert("Verifikasi berhasil! Silakan atur ulang password.");
      navigate("/reset-password");
    } catch (error) {
      console.error("Verification error:", error.response?.data || error.message);
      alert("Verifikasi gagal! Periksa kembali kode OTP.");
    }
  };

  return (
    <div>
      <h2>Verifikasi Reset Password</h2>
      <p>Masukkan kode OTP yang telah dikirim ke email {email}.</p>
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
