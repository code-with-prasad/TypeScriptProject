import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { decrypt } from "../utils/crypto";

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
  refresh: boolean;
  onEdit: (student: Student) => void;
}

const StudentList: React.FC<Props> = ({ refresh, onEdit }) => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/students");
      const decrypted = res.data.map((s: any) => {
        const student = decrypt(s.data);
        return student ? { ...student, id: s.id } : null;
      });
      setStudents(decrypted.filter(Boolean));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
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
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.dob}</td>
              <td>{s.gender}</td>
              <td>{s.address}</td>
              <td>{s.course}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => onEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
