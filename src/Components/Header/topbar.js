import React from "react";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import "./topbar.css";
import { getAuthenticatedUser, logoutAuthenticatedUser } from "../../Services/Auth";
import Sidebar from "./Sidebar";

function Topbar() {
  const navigate = useNavigate();
  const [userProfile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userData = getAuthenticatedUser();
    if(userData){
      setProfile(userData);
    }
  };

  const logoutUser = ()=>{
    logoutAuthenticatedUser();
    navigate('/login');
  }

  return (
    <div className="App">
      <header className="header">
        <h2>Student Management System </h2>
        <button className="login-button" onClick={logoutUser}>Logout</button>
      </header>
      <Sidebar />
    </div>
  );
}

export default Topbar;






