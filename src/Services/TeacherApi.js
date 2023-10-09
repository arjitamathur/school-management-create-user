import {LocalStorageFormHandler} from '../Database';

export const db = new LocalStorageFormHandler('teachers');

export const getAllTeacher = (id) => {
    if(id){
        return db.getData(id);
    }
    return db.getAllData();
}

export const addTeacher = (data) => {
    return db.saveData(data)
}

export const editTeacher = (id, data) => {
    return  db.editData(id, data)
}


export const deleteTeacher = (id) => {
    return db.deleteData(id)
}