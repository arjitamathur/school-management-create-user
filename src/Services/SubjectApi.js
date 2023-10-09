import axios from 'axios';
const baseUrl = "http://127.0.0.1:3003";

export const getAllSubject = async (id) => {
    id = id || '';
    return await axios.get(`${baseUrl}/subjects/${id}`);
}

export const addSubject = async (user) => {
    const url = `${baseUrl}/subjects`;
    return await axios.post(url,user);
}

export const editSubject = async (id, user) => {
    return await axios.put(`${baseUrl}/subjects/${id}`,user);
}


export const deleteSubject = async (id) => {
    return await axios.delete(`${baseUrl}/subjects/${id}`);
}