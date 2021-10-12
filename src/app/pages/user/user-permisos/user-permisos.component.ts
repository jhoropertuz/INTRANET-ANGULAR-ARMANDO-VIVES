import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';

@Component({
  selector: 'app-user-permisos',
  templateUrl: './user-permisos.component.html',
  styleUrls: ['./user-permisos.component.css']
})
export class UserPermisosComponent implements OnInit {
  titulo="Permisos";
  mostrarTablasPermisos=false;
  todosPermisos=[];
  misPermisos=[];
  arraySeleccion=[];
  usuarioID;
  usuario;
  constructor(public BaseService:BaseService,public Router:Router ,public SweetalertService:SweetalertService ,public ActivatedRoute:ActivatedRoute) {

  }
  ngOnInit(): void {
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.usuarioID=id;
      this.cargarOperaciones();
    }else{
      this.SweetalertService.modal("error","Error al buscar el usuario.");
      this.Router.navigateByUrl("user");
    }

  }

  cargarOperaciones(){
    this.BaseService.postJson("usuario","operacionesUsuario",{usuarioID:this.usuarioID}).subscribe(res=>{
      this.todosPermisos=res.DATOS.TodosOperaciones;
      this.misPermisos=res.DATOS.UsuarioOperaciones;
      this.usuario=res.DATOS.Usuario;
      this.titulo += " de usuario: "+ this.usuario.usuarioNOMBRE; 
      this.misPermisos.forEach(miPermiso => {
        this.arraySeleccion.push(miPermiso.controlOperacionID);
        this.todosPermisos.forEach(permiso => {
          if(permiso.controlOperacionID==miPermiso.controlOperacionID){
            permiso.check=true;
          }
        });
      });
      console.log( this.todosPermisos);
      this.mostrarTablasPermisos=true;
      console.log(this.arraySeleccion);
    });

  }

  selectElemto(e){
    if (e.target.checked) {
      this.arraySeleccion.push(e.target.value);
    } else {
      let index=this.arraySeleccion.indexOf(e.target.value);
      if(index!=-1){
        this.arraySeleccion.splice(index,1);
      }
    }
    console.log(this.arraySeleccion);

  }

  guardarPermisos(){
    this.BaseService.postJson("usuario","guardarOperacionesUsuario",{usuarioID:this.usuarioID,operaciones:this.arraySeleccion}).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        this.SweetalertService.notificacion("success",res.MENSAJE);
        this.Router.navigateByUrl("user");
      }else{
        let tipoAlerta;
        if(res.RESPUESTA="ERROR"){
          tipoAlerta="error";
        }else{
          tipoAlerta="info"
        }
        this.SweetalertService.modal(tipoAlerta,res.MENSAJE);
      }
    });
  }


}
