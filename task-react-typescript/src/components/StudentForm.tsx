// src/components/StudentForm.tsx
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { encrypt } from "../utils/crypto";

const StudentForm = ({ onStudentAdded }: { onStudentAdded: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const encryptedData = encrypt(formData);
      await axios.post("http://localhost:3000/students", { data: encryptedData });

      Swal.fire("Success", "Student Added!", "success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        course: "",
        password: "",
      });

      onStudentAdded();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add student", "error");
    }
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="form-control mb-2" required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-2" required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="form-control mb-2" required />
        <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className="form-control mb-2" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="form-control mb-2" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="form-control mb-2" required />
        <input name="course" placeholder="Course Enrolled" value={formData.course} onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-control mb-2" required />
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default StudentForm;
