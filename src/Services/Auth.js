import {LocalStorageFormHandler} from '../Database';
import { db as studentDb} from "./StudentApi";
import { db as teacherDb } from "./TeacherApi";
import { db as userRoleDb } from "./UserRoleApi";

const db = new LocalStorageFormHandler('principleusers');
// Define roles
const ADMIN = "admin";
const TEACHER = "teacher";
const STUDENT = "student";

export const UserRoles = Object.freeze({
  ADMIN: ADMIN,
  TEACHER: TEACHER,
  STUDENT: STUDENT
});

export const addAdminUser = (data) => {
    return db.saveData(data)
}

export const getAuthUser = (email) => {
    return (
      db.getProfileData(email) ||
      teacherDb.getProfileData(email) ||
      studentDb.getProfileData(email) ||
      userRoleDb.getProfileData(email)
    );
}

export const checkPassword = (plainPassword, encryptedPassword)=>{
    // Check password if valid
    // encryptedPassword -> Which is stored in storage
    // plainPassword -> Which is entered by the login user
    return plainPassword === encryptedPassword
}

export const getAuthenticatedUser = ()=>{
    const userData = sessionStorage.getItem('authUser');
    if(userData){
        return JSON.parse(userData);
    }
    return null;
}

export const logoutAuthenticatedUser = ()=>{
    sessionStorage.removeItem('authUser');
    return true;
}