import {LocalStorageFormHandler} from '../Database';

const db = new LocalStorageFormHandler('classes');

export const getAllClass = (id) => {
    if(id){
        return db.getData(id);
    }
    return db.getAllData();
}

export const addClass = (data) => {
    return db.saveData(data)
}

export const editClass = (id, data) => {
    return  db.editData(id, data)
}


export const deleteClass = (id) => {
    return db.deleteData(id)
}