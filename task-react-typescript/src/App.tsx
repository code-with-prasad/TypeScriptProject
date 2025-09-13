import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // toggle
  const [refresh, setRefresh] = useState(false);

  const handleStudentAdded = () => setRefresh(!refresh);

  return (
    <div>
      {!loggedIn ? (
        <>
          {showRegister ? (
            <StudentForm
              onStudentAdded={() => {
                setRefresh(!refresh);
                setShowRegister(false); // after register, go to login
              }}
            />
          ) : (
            <LoginForm onLogin={() => setLoggedIn(true)} />
          )}

          {/* Toggle Button */}
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <button
              className="btn btn-link"
              onClick={() => setShowRegister(!showRegister)}
            >
              {showRegister ? "Back to Login" : "Register New User"}
            </button>
          </div>
        </>
      ) : (
        <>
          <StudentForm onStudentAdded={handleStudentAdded} />
          <StudentList refresh={refresh} />
        </>
      )}
    </div>
  );
};

export default App;
