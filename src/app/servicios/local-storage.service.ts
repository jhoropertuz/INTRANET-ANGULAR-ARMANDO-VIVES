import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  postData(id:string,value:string){
    localStorage.setItem(id,value);
  }

  getData(id:string){
    let data = localStorage.getItem(id);
    return data;
  }

  postDatoJson(id:string,obj:object){
    localStorage.setItem(id, JSON.stringify(obj));
  }

  getDatoJson(id:string){
    let data= JSON.parse(localStorage.getItem(id));
    return data;
  }

  deleteData(id:string){
    localStorage.removeItem(id);
  }

  deleteAll(){
    localStorage.clear();
  }
}
