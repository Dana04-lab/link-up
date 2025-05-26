'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { auth } from "@/app/firebase";

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Құпиясөздер сәйкес келмейді');
      return;
    }
    if (!name.trim()) {
      alert('Аты-жөніңізді енгізіңіз');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ displayName орнату
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert('Тіркелу сәтті өтті!');
      router.push("/sign-in");
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Бұл email бұрын тіркелген.');
      } else if (error.code === 'auth/weak-password') {
        alert('Құпиясөз тым әлсіз. 6 таңбадан көп болу керек.');
      } else {
        alert('Тіркелу кезінде белгісіз қате болды.');
      }
    }
  };

  const goToSignIn = () => {
    router.push('/sign-in');
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
        <h1 style={{ textAlign: "center", color: "white", fontSize: "28px" }}>Тіркелу</h1>

        <input 
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          placeholder="Аты-жөніңіз"
        />

        <input 
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          placeholder="Email"
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="Құпиясөз"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            style={eyeButtonStyle}
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            placeholder="Құпиясөзді қайталаңыз"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(prev => !prev)}
            style={eyeButtonStyle}
          >
            {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>

        <button onClick={handleSignUp} style={submitButtonStyle}>Тіркелу</button>

        <button onClick={goToSignIn} style={linkButtonStyle}>Кіру</button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "white",
  outline: "none",
  fontSize: "16px",
  transition: "0.3s"
};

const eyeButtonStyle = {
  position: "absolute" as const,
  top: "50%",
  right: "12px",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer"
};

const submitButtonStyle = {
  marginTop: "10px",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  border: "none",
  padding: "14px",
  borderRadius: "12px",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold" as const,
  cursor: "pointer",
  transition: "0.3s"
};

const linkButtonStyle = {
  backgroundColor: "transparent",
  border: "1px solid white",
  padding: "12px",
  borderRadius: "12px",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.3s"
};
