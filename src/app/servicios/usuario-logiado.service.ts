import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogiadoService {
  private ADMIN="ADMIN";
  private ESTUDIANTE="ESTUDIANTE";
  constructor(public LocalStorageService:LocalStorageService,public router:Router) { }


  getUsuario() {
    return this.LocalStorageService.getDatoJson("usuario");
  }

  postUsuario(data){
    return this.LocalStorageService.postData("usuario",data);
  }

  adminUsuario(){
    let usuario=this.LocalStorageService.getDatoJson("usuario");
    if(usuario && usuario.usuarioTIPO==this.ADMIN){
      return true;
    }
    return false;
  }

  estudianteUsuario(){
    let usuario=this.LocalStorageService.getDatoJson("usuario");
    if(usuario && usuario.usuarioTIPO==this.ESTUDIANTE){
      return true;
    }
    return false;
  }
  /* async permisosItemMenu(){
    let usuarioID=this.getUsuario().usuarioID;
    let arrayItemMenu = await
    return arrayItemMenu;
  } */

  cerrarSesion(){
    this.LocalStorageService.deleteAll();
    this.router.navigateByUrl("login");
  }
}
