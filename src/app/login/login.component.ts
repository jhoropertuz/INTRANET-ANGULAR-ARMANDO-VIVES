import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataC;
  constructor(private LocalStorageService:LocalStorageService ,private fb: FormBuilder,private BaseService:BaseService, public SweetalertService:SweetalertService, public Router:Router) {
    this.dataC=this.fb.group({
      usuario: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
   }

  ngOnInit(): void {

  }

  login(values){
    let usuario= values.usuario;
    let password= values.password;
    if(usuario && password ){
       this.BaseService.postJson('Usuario','validarUsuario',{usuarioNombre:usuario,usuarioClave:password}).subscribe(res=>{
          if(res.RESPUESTA=="EXITO"){
            let usuario =res.DATOS;
             this.LocalStorageService.postDatoJson("usuario",usuario);
             if(usuario.personaDIRECCION && usuario.personaGENERO && usuario.personaESTADOCIVIL && usuario.personaMUNICIPIONACIMIENTO && usuario.epsID){
                this.SweetalertService.notificacion("success","Bienvenido");
                this.Router.navigateByUrl("/");
             }else{
              this.Router.navigateByUrl("user/perfil/datos");
              this.SweetalertService.modal("info","Por favor actualizar datos personales.");
             }
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
       });
    }
  }



}
