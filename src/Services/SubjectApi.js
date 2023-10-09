import {LocalStorageFormHandler} from '../Database';

const db = new LocalStorageFormHandler('subjects');

export const getAllSubject = (id) => {
    if(id){
        return db.getData(id);
    }
    return db.getAllData();
}

export const addSubject = (data) => {
    return db.saveData(data)
}

export const editSubject = (id, data) => {
    return  db.editData(id, data)
}


export const deleteSubject = (id) => {
    return db.deleteData(id)
}