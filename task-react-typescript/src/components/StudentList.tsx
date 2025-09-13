// src/components/StudentList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { decrypt } from "../utils/crypto";

const StudentList = ({ refresh }: { refresh: boolean }) => {
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:3000/students");
    const decrypted = res.data.map((s: any) => decrypt(s.data));
    setStudents(decrypted.filter(Boolean));
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const handleDelete = async (index: number) => {
    try {
      const allStudents = await axios.get("http://localhost:3000/students");
      const idToDelete = allStudents.data[index].id;
      await axios.delete(`http://localhost:3000/students/${idToDelete}`);
      Swal.fire("Deleted", "Student removed", "success");
      fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Student List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s: any, idx) => (
            <tr key={idx}>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.dob}</td>
              <td>{s.gender}</td>
              <td>{s.address}</td>
              <td>{s.course}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(idx)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
