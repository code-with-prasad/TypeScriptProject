
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { decrypt } from "../utils/crypto";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:5000/students");
      const students = res.data;

      const matched = students.find((s: any) => {
        const decrypted = decrypt<{ email: string; password: string }>(s.data);
        return decrypted?.email === email && decrypted?.password === password;
      });

      if (matched) {
        Swal.fire("Success", "Login Successful!", "success");
        onLogin();
      } else {
        Swal.fire("Error", "Invalid Credentials", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
