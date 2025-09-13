import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { encrypt } from "../utils/crypto";

interface Student {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  course: string;
  password?: string;
}

interface Props {
  onStudentAdded: () => void;
  studentToEdit?: Student | null;
  clearEdit: () => void;
  registerMode?: boolean; // added this
}

const StudentForm: React.FC<Props> = ({
  onStudentAdded,
  studentToEdit,
  clearEdit,
  registerMode = false,
}) => {
  const [formData, setFormData] = useState<Student>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        ...studentToEdit,
        password: "", // reset password for security
      });
    }
  }, [studentToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
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
    clearEdit();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const encryptedData = encrypt(formData);

    try {
      if (studentToEdit && studentToEdit.id) {
        
        await axios.put(`http://localhost:3000/students/${studentToEdit.id}`, {
          data: encryptedData,
        });
        Swal.fire("Updated", "Student updated successfully", "success");
      } else {
        
        await axios.post("http://localhost:3000/students", { data: encryptedData });
        Swal.fire("Registered", "Student registered successfully", "success");
      }

      onStudentAdded();
      resetForm();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  return (
    <div className="container mt-3 mb-4 p-3 border rounded bg-light">
      <h4>
        {registerMode ? "Register" : studentToEdit ? "Edit Student" : "Add Student"}
      </h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="form-control"
            required 
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {registerMode ? "Register" : studentToEdit ? "Update Student" : "Add Student"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
