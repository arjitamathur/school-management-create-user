import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../Views/Class/Dashboard/index";
import Subjects from "../Views/Subject/Subjects/index";
import Students from "../Views/Student/Students/index";
import AddClass from "../Views/Class/AddClass/index";
import AddSubjects from "../Views/Subject/AddSubject/index";
import AddStudents from "../Views/Student/AddStudent/index";
import EditClass from "../Views/Class/EditClass/index";
import EditSubject from "../Views/Subject/EditSubject/index";
import EditStudents from "../Views/Student/EditStudent/index";
import Login from "../Views/LoginPage/index";
import Register from "../Views/RegisterPage/index";
import Teacher from "../Views/Teacher/Teacher/index";
import AddTeacher from "../Views/Teacher/AddTeacher/index";
import EditTeacher from "../Views/Teacher/EditTeacher/index";
import UserDashboard from "../Views/Common/Dashboard";
import { ToastContainer } from "react-toastify";
import { UserRoles, getAuthenticatedUser } from "../Services/Auth";
import UserRole from "../Views/UserRole/UserRole";
import AddUserRole from "../Views/UserRole/AddUserRole";
import EditUserRole from "../Views/UserRole/EditUserRole";
import UserProfile from "../Components/UserProfile/UserProfile";

function PrincipleRouter(props) {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Routes>
        {/* <Route path="/" element={<UserDashboard />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/userrole" element={<UserRole />} />

        <Route path="/add" element={<AddUserRole />} />
        <Route path="/edit/:id" element={<EditUserRole />} />
        <Route path="/login" element={<Login />} />

        <Route path="/class" element={<Navigate to="/class/list" />} />
        <Route path="/class/list" element={<Dashboard />} />
        <Route path="/class/add" element={<AddClass />} />
        <Route path="/class/edit/:id" element={<EditClass />} />

        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/add" element={<AddSubjects />} />
        <Route path="/subjects/edit/:id" element={<EditSubject />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudents />} />
        <Route path="/students/edit/:id" element={<EditStudents />} />

        <Route path="/teachers" element={<Teacher />} />
        <Route path="/teacher/add" element={<AddTeacher />} />
        <Route path="/teacher/edit/:id" element={<EditTeacher />} />
      </Routes>
    </div>
  );
}

function TeacherRouter(props) {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<UserDashboard />} />

        <Route path="/login" element={<Login />} />
        

        <Route path="/class" element={<Navigate to="/class/list" />} />
        <Route path="/class/list" element={<Dashboard />} />
        <Route path="/class/add" element={<AddClass />} />
        <Route path="/class/edit/:id" element={<EditClass />} />

        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/add" element={<AddSubjects />} />
        <Route path="/subjects/edit/:id" element={<EditSubject />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudents />} />
        <Route path="/students/edit/:id" element={<EditStudents />} />
      </Routes>
    </div>
  );
}

function StudentRouter(props) {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function PublicRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<UserDashboard />} /> */}

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route path="/userrole" element={<UserRole />} />
      <Route path="/edit/:id" element={<EditUserRole />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

function AppRouter() {
  const [loginUser, setProfile] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userData = getAuthenticatedUser();
    setProfile(userData);
  };

  return (
    <BrowserRouter>
      {loginUser === null ? (
        <PublicRouter />
      ) : (
        <>
          {loginUser.role === UserRoles.ADMIN ? (
            <PrincipleRouter />
          ) : loginUser.role === UserRoles.TEACHER ? (
            <TeacherRouter />
          ) : (
            <StudentRouter />
          )}
        </>
      )}
    </BrowserRouter>
  );
}

export default AppRouter;
