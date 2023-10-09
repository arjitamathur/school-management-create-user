import {LocalStorageFormHandler} from '../Database';


import axios from 'axios';
const baseUrl = "http://127.0.0.1:3003";

export const getUser = async (email) => {
    console.log(email);
   const response = await axios.get(`${baseUrl}/users?email=${email}`); //return list of users
   const users=response.data;
   if(users.length>0){
    return users[0]
   } return  null;
}


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