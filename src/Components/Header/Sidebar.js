import React, { useEffect, useState } from "react";
import { getAuthenticatedUser, UserRoles } from "../../Services/Auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import "./Sidebar.css";

function Sidebar() {
  const [activeLink, setActiveLink] = useState(""); 
  const navigate = useNavigate();
  const [userProfile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    const userData = getAuthenticatedUser();
    if(userData){
      setProfile(userData);
    }else{
      toast.error('User session expired or not exists', {
        position: "top-center",
      });
      navigate('/login');
    }
  };

  useEffect(() => {
    // Get the current path
    const currentPath = window.location.pathname;

    // Find the corresponding link and set it as active
    const links = document.querySelectorAll(".sidebar-nav a");
    links.forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        setActiveLink(link.getAttribute("href"));
      }
    });
  }, []); 

  return (
    <div className="sidebar">
      <div className="sidebar-header">
      {/* <img src={schoolIcon} alt="School Icon" className="school-icon" />
      <img
  src={schoolIcon}
  alt="School Icon"
  className="school-icon"
  style={{ position: 'absolute', top: '0', left: '0' }}
/> */}
        <h2 className="header-logo">LOGO</h2>
      </div>
      <nav className="sidebar-nav">
        <ul className="no-bullets">
          {userProfile.role === UserRoles.ADMIN ? (
            <>
             
              <li>
                <a
                  href="/class"
                  className={activeLink === "/class" ? "active" : ""}
                >
                  Class
                </a>
              </li>
              <li>
                <a
                  href="/subjects"
                  className={activeLink === "/subjects" ? "active" : ""}
                >
                  Subjects
                </a>
              </li>
              <li>
                <a
                  href="/userrole"
                  className={activeLink === "/userrole" ? "active" : ""}
                >
                  Users
                </a>
              </li>
        
          
            </>
          ) : userProfile.role === UserRoles.TEACHER ? (
            <>
            <li>
                <a
                  href="/profile"
                  className={activeLink === "/profile" ? "active" : ""}
                >
                  Your Profile
                </a>
              </li>
              <li>
                <a
                  href="/class"
                  className={activeLink === "/class" ? "active" : ""}
                >
                  Class
                </a>
              </li>
              <li>
                <a
                  href="/subjects"
                  className={activeLink === "/subjects" ? "active" : ""}
                >
                  Subjects
                </a>
              </li>
             
            </>
          ) :    (
            <>
            <li>
                <a
                  href="/profile"
                  className={activeLink === "/profile" ? "active" : ""}
                >
                  Your Profile
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
