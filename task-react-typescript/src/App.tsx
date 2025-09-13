import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  // Called after a student is added or updated
  const handleStudentAdded = () => {
    setRefresh(!refresh);
    setShowForm(false);
    setRegisterMode(false);
  };

  const handleEdit = (student: any) => {
    setEditStudent(student);
    setShowForm(true);
    setRegisterMode(false);
  };

  const handleAddNew = () => {
    setEditStudent(null);
    setShowForm(true);
    setRegisterMode(false);
  };

  const handleRegister = () => {
    setEditStudent(null);
    setShowForm(true);
    setRegisterMode(true); // show StudentForm in register mode
  };

  return (
    <div className="container mt-3">
      {!loggedIn ? (
        <>
          {showForm && registerMode ? (
            <StudentForm
              onStudentAdded={handleStudentAdded}
              studentToEdit={null}
              clearEdit={() => setShowForm(false)}
              registerMode={true}
            />
          ) : (
            <>
              <LoginForm onLogin={() => setLoggedIn(true)} />
              <button className="btn btn-link mt-3" onClick={handleRegister}>
                Register
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Student Management</h2>
            <button className="btn btn-primary" onClick={handleAddNew}>
              Add New Student
            </button>
          </div>

          {showForm && (
            <StudentForm
              onStudentAdded={handleStudentAdded}
              studentToEdit={editStudent}
              clearEdit={() => setEditStudent(null)}
              registerMode={false}
            />
          )}

          <StudentList refresh={refresh} onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};

export default App;
