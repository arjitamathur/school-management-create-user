import axios from 'axios';
const baseUrl = "http://127.0.0.1:3003";

export const getAllClass = async (id) => {
    id = id || '';
    return await axios.get(`${baseUrl}/classes/${id}`);
}

export const addClass = async (user) => {
    const url = `${baseUrl}/classes`;
    return await axios.post(url,user);
}

export const editClass = async (id, user) => {
    return await axios.put(`${baseUrl}/classes/${id}`,user);
}


export const deleteClass = async (id) => {
    return await axios.delete(`${baseUrl}/classes/${id}`);
}