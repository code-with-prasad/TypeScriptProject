import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { decrypt, deterministicDecrypt, deterministicEncrypt, encrypt } from "../utils/crypto";

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Fetch only the student with the given email
     const encryptedEmail = deterministicEncrypt(email);
     console.log('prev', 'U2FsdGVkX1+APGzYKVIOJk4Skg6FEh1B/+nAXdMIBIY=');
     console.log('encryptedEmail',encryptedEmail);
     
     
  const encryptedPassword = encrypt(password);

 const res = await axios.get(
  `http://localhost:5000/students?email=${encodeURIComponent(encryptedEmail)}`
);
  console.log('res',res);
  
      const students = res.data;
      console.log(students);
      

      if (students.length === 0) {
        Swal.fire("Error", "Invalid Credentials", "error");
        return;
      }

      const student = students[0];
      console.log('student',student);
      

      const decryptedEmail = deterministicDecrypt(student.email);
      const decryptedPassword = decrypt(student.password);
      console.log('decryptedEmail',decryptedEmail);
      console.log('decryptedPassword',decryptedPassword);
      
      

      if (decryptedEmail === email && decryptedPassword === password) {
        Swal.fire("Success", "Login Successful!", "success");
        onLogin();
      } else {
        Swal.fire("Error", "Invalid Credentials", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
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
