import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../Views/Class/Dashboard/index";
import Subjects from "../Views/Subject/Subjects/index";

import AddClass from "../Views/Class/AddClass/index";
import AddSubjects from "../Views/Subject/AddSubject/index";

import EditClass from "../Views/Class/EditClass/index";
import EditSubject from "../Views/Subject/EditSubject/index";

import Login from "../Views/LoginPage/index";


import UserDashboard from "../Views/Common/Dashboard";
import { ToastContainer } from "react-toastify";
import { UserRoles, getAuthenticatedUser } from "../Services/Auth";
import UserRole from "../Views/UserRole/UserRole";
import AddUserRole from "../Views/UserRole/AddUserRole";
import EditUserRole from "../Views/UserRole/EditUserRole";

function PrincipleRouter(props) {
  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
     
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
    console.log("userdata" , userData)
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
