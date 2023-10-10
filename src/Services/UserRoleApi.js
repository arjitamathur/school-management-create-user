import axios from 'axios';
import {getAuthenticatedUser  } from "./Auth"
import { toast } from 'react-toastify';

const baseUrl = "http://127.0.0.1:3003";


export const getAllUserRole = async (id) => {
    id = id || '';
   
    return await axios.get(`${baseUrl}/users/${id}`);
}

export const addUserRole = async (user) => {
    const url = `${baseUrl}/users`;
    return await axios.post(url,user);
}

export const editUserRole = async (id, user) => {
   const authenticatedUser= getAuthenticatedUser();
   if(authenticatedUser.id===id){
return new Promise(null) ;
   }
   console.log("id user" , id , user)
   return await axios.put(`${baseUrl}/users/${id.id}`,id);

}


export const deleteUserRole = async (id) => {
    const authenticatedUser= getAuthenticatedUser();
    if(authenticatedUser.id===id){
        return new Promise(r =>
            toast.error('Cannot Delete Admin')
          )
     } return await axios.delete(`${baseUrl}/users/${id}`);

   
}

