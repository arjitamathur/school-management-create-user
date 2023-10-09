// Localstorage file data handler
export class LocalStorageFormHandler {
    constructor(dataKey) {
      this.dataKey = dataKey;
    }
    
    getAllData(){
        const savedFormData = localStorage.getItem(this.dataKey);
        let parsedFormData = []
        if (savedFormData) {
            parsedFormData = JSON.parse(savedFormData);
        }
        return parsedFormData;
    }

    saveData(data) {
      const parsedFormData = this.getAllData()
      
      const formData = {
        ...data,
        id: parsedFormData.length+1
      };
      parsedFormData.push(formData)
      localStorage.setItem(this.dataKey, JSON.stringify(parsedFormData));
    }
    

    getData(id){
        const parsedFormData = this.getAllData();
        return parsedFormData.find(o => o.id == id);
    }

    getProfileData(email){
        const parsedFormData = this.getAllData();
        return parsedFormData.find(o => o.email == email);
    }

    deleteData(id){
        const parsedFormData = this.getAllData();
        const updatedData =  parsedFormData.filter(o => o.id !== id);
        localStorage.setItem(this.dataKey, JSON.stringify(updatedData));
        return updatedData;
    }

    editData(id, data){
        const parsedFormData = this.getAllData();
        const formData = {
            ...data,
            id: id
        }
        let updatedData = parsedFormData.filter(o => o.id != id);
        updatedData.push(formData)
        localStorage.setItem(this.dataKey, JSON.stringify(updatedData));
        return updatedData;
    }

    clearFormData() {
        localStorage.removeItem(this.dataKey);
        const form = document.getElementById(this.formId);
        form.reset();
    }
  }