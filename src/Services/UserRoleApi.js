import { LocalStorageFormHandler } from "../Database";

export const db = new LocalStorageFormHandler("UserRoles");

export const getAllUserRole = (id) => {
  if (id) {
    return db.getData(id);
  }
  return db.getAllData();
};

export const addUserRole = (data) => {
  return db.saveData(data);
};

export const editUserRole = (id, data) => {
  return db.editData(id, data);
};

export const deleteUserRole = (id) => {
  return db.deleteData(id);
};
