import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import Teacher from "../../Teacherdata";
import TeacherCom from "./Teacher";
import Student from "./Student";


export default function UserProfile() {

  const [teacherData, setTeacherData] = useState([]);

  const userId = useLocation();
  const id = userId.state;
  
  function isEmailExists(id) {
    for (let i = 0; i < Teacher.length; i++) {
      if (Teacher[i].id === id) {
        setTeacherData(Teacher[i]);
        console.log(Teacher[i]);
      }
    }
  }
  useEffect(() => {
    isEmailExists(id);
  }, []);

  return (
    <div>
      {teacherData.type === 1 ? (
        <TeacherCom teacherData={teacherData} />
      ) : (
        <Student teacherData={teacherData} />
      )}
    </div>
  );
}
