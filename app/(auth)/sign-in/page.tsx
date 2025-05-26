'use client';

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { useRouter } from "next/navigation";

import PasswordInput from '@/components/PasswordInput';
import { toast } from 'sonner';
import { auth } from "@/app/firebase";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      setError('Қате email немесе құпиясөз');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Email енгізіңіз');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("📧 Құпиясөзді қалпына келтіру сілтемесі email арқылы жіберілді");
    } catch (err) {
      console.error(err);
      toast.error("Қате: сілтеме жіберілмеді");
    }
  };

  const goToSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        padding: "40px",
        borderRadius: "20px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <h1 style={{ textAlign: "center", color: "white", fontSize: "28px" }}>Кіру</h1>

        <div style={{ position: "relative" }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
              outline: "none",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onFocus={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"}
            onBlur={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
            placeholder="Email"
          />
        </div>

        <PasswordInput
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="Құпиясөз"
        />

        <button
          type="button"
          onClick={handleForgotPassword}
          style={{
            color: '#ccc',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            textAlign: 'right',
            marginTop: '-10px'
          }}
        >
          Құпиясөзді ұмыттыңыз ба?
        </button>

        {error && (
          <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleSignIn}
          style={{
            marginTop: "10px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            border: "none",
            padding: "14px",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
        >
          Кіру
        </button>

        <button
          onClick={handleGoogleSignIn}
          style={{
            marginTop: "10px",
            backgroundColor: "white",
            color: "#24243e",
            padding: "14px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
        >
          Google арқылы кіру
        </button>

        <button
          onClick={goToSignUp}
          style={{
            backgroundColor: "transparent",
            border: "1px solid white",
            padding: "12px",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          Тіркелу
          
        </button>

      </div>
    </div>
  );
}