import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { FechaService } from 'app/servicios/fecha.service';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';
import { Alert } from 'bootstrap';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  personaNarura=true;
  tituloFormulario="Formulario Usuario";
  tituloaccion="Guardar";
  tipoPersonas=[];
  tiposIdentificaciones=[];
  gruposTrabajo=[];
  nivelesEscolares=[];
  formUser;
  unidadesFuncionales=[];
  cargos=[];
  aseguradorasriesgoslaborales=[];
  fondospensiones=[];
  entidadespromotorassalud=[];
  municipios=[];
  departamentos=[];
  paises=[];
  paisesExpedicion=[];
  municipiosExpedicion=[];
  departamentosExpedicion=[];
  miPerfil=false;
  constructor(public UsuarioLogiadoService:UsuarioLogiadoService,public  Router:Router,public FechaService: FechaService ,public  ActivatedRoute:ActivatedRoute ,public SweetalertService:SweetalertService ,private fb: FormBuilder, public BaseService:BaseService,public LocalStorageService:LocalStorageService) {
    let fechaActual=this.FechaService.Actual("YYYY-MM-DD").toString();
    this.formUser=this.fb.group({
      usuarioNOMBRE: new FormControl('', Validators.compose([Validators.required])),
      usuarioCLAVE: new FormControl(''),
      usuarioTIPO: new FormControl('', Validators.compose([Validators.required])),
      tipoPersonaID: new FormControl('1', Validators.compose([Validators.required])),
      tipoIdentificacionID: new FormControl('', Validators.compose([Validators.required])),
      personaIDENTIFICACION: new FormControl('', Validators.compose([Validators.required])),
      personaPRIMERNOMBRE: new FormControl(''),
      personaSEGUNDONOMBRE: new FormControl(''),
      personaPRIMERAPELLIDO: new FormControl(''),
      personaSEGUINDOAPELLIDO: new FormControl(''),
      personaCORREO: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      personaCELULAR: new FormControl('', Validators.compose([Validators.required])),
      grupoTrabajoID: new FormControl('', Validators.compose([Validators.required])),
      unidadFuncionalID: new FormControl(''),
      nivelEscolarID: new FormControl('', Validators.compose([Validators.required])),
      usuarioESTADO:  new FormControl('', Validators.compose([Validators.required])),
      personaRAZONSOCIAL: new FormControl(''),
      personaMUNICIPIOEXPEDICION: new FormControl(''),
      colaboradorFCHINGRESO: new FormControl(fechaActual, Validators.compose([Validators.required])),
      personaDIRECCION: new FormControl('', Validators.compose([Validators.required])),
      personaFCHNACIMIENTO: new FormControl(fechaActual, Validators.compose([Validators.required])),
      epsID: new FormControl('', Validators.compose([Validators.required])),
      fondoPensionID: new FormControl('', Validators.compose([Validators.required])),
      arlID:new FormControl('', Validators.compose([Validators.required])),
      cargoID:new FormControl('', Validators.compose([Validators.required])),
      colaboradorCORREO: new FormControl(''),
      personaNUMEROHIJOS:new FormControl('0'),
      departamentoID:new FormControl(''),
      paisID:new FormControl(''),
      departamentoExpedicionID:new FormControl(''),
      paisExpedicionID:new FormControl(''),
      personaMUNICIPIONACIMIENTO:new FormControl(''),
      personaGENERO:new FormControl(''),
      personaESTADOCIVIL:new FormControl('') ,
      personaRUT: new FormControl('')
    });
  }

  ngOnInit(): void {
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");
    let miperfil=this.ActivatedRoute.snapshot.paramMap.get("miPerfil");
    if(id){
      this.cargarDatosUsuario(id);
    }else if(miperfil){
      let usuarioID=this.UsuarioLogiadoService.getUsuario().usuarioID;
      if(usuarioID){
        this.cargarDatosUsuario(usuarioID);
        this.miPerfil=true;
      }else{
        this.SweetalertService.modal("error","Datos insuficientes.");
        this.Router.navigateByUrl("/");
      }
    }else{
      let defaultPaisID=47;
      this.formUser.controls['paisID'].setValue(defaultPaisID);
      this.formUser.controls['paisExpedicionID'].setValue(defaultPaisID);
      this.selectPaisExpedicion(defaultPaisID);
      this.selectPais(defaultPaisID);
    }
    this.datosEntrada();
  }

  enviarPeticion(formValue){
    console.log(formValue);
    formValue.usuarioUSR=this.LocalStorageService.getDatoJson("usuario").usuarioID;
    this.BaseService.postJson('usuario','guardar',formValue).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        this.SweetalertService.notificacion("success",res.MENSAJE);
        if(this.miPerfil){
          this.Router.navigateByUrl('/');
        }else{
          this.Router.navigateByUrl('user');
        }
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

  datosEntrada(){
    this.BaseService.postJson('datosGenerales','datosEntradaForm',{}).subscribe(res=>{
      console.log(res);
      if(res.RESPUESTA=="EXITO"){
        this.tipoPersonas=res.DATOS.TipoPersonas;
        this.tiposIdentificaciones=res.DATOS.TiposIdentificaciones;
        this.nivelesEscolares=res.DATOS.NivelesEscolares;
        this.cargos=res.DATOS.Cargos;
        this.aseguradorasriesgoslaborales=res.DATOS.AseguradorasRiesgosLaborales;
        this.fondospensiones=res.DATOS.FondosPensiones;
        this.entidadespromotorassalud=res.DATOS.EntidadesPromotorasSalud;
        this.unidadesFuncionales=res.DATOS.UnidadesFuncionales;
        this.paises=res.DATOS.Paises;
        this.paisesExpedicion=res.DATOS.Paises;
      }
    });
  }

  cambioTipoPersona(){
    if(this.formUser.controls['tipoPersonaID'].value == 1){
      this.personaNarura=true;
    }else{
      this.personaNarura=false;
    }

  }

  selectUnidad(unidadFuncionalID,grupoTrabajoID=null){
    if (unidadFuncionalID) {
      this.BaseService.postJson('datosGenerales','grupoTrabajoPorUnidad',{unidadFuncionalID:unidadFuncionalID}).subscribe(res=>{
          console.log(res);
          if(res.RESPUESTA=="EXITO"){
            this.gruposTrabajo=res.DATOS.GruposTrabajo;
            if(grupoTrabajoID!=null){
              this.formUser.controls['grupoTrabajoID'].setValue(grupoTrabajoID);
            }
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
      });
    }else{
      this.gruposTrabajo=[];
    }
  }

  selectDepartamento(departamentoID,municipioID=null){
    if (departamentoID) {
      this.BaseService.postJson('datosGenerales','municipioPorDepartamento',{departamentoID:departamentoID}).subscribe(res=>{
          console.log(res);
          if(res.RESPUESTA=="EXITO"){
            this.municipios=res.DATOS.Municipios;
            if(municipioID!=null){
              this.formUser.controls['personaMUNICIPIONACIMIENTO'].setValue(municipioID);
            }
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
      });
    }else{
      this.municipios=[];
    }
  }

  selectPais(paisID,departamentoID=null,municipioID=null){
    if (paisID) {
      this.BaseService.postJson('datosGenerales','departentoPorPais',{paisID:paisID}).subscribe(res=>{
          console.log(res);
          if(res.RESPUESTA=="EXITO"){
            this.departamentos=res.DATOS.Departamentos;
            this.municipios=[];
            if(departamentoID!=null){
              this.formUser.controls['departamentoID'].setValue(departamentoID);
              this.selectDepartamento(departamentoID,municipioID);
            }
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
      });
    }else{
      this.departamentos=[];
      this.municipios=[];
    }
  }

  selectDepartamentoExpedicion(departamentoID,municipioID=null){
    if (departamentoID) {
      this.BaseService.postJson('datosGenerales','municipioPorDepartamento',{departamentoID:departamentoID}).subscribe(res=>{
          console.log(res);
          if(res.RESPUESTA=="EXITO"){
            this.municipiosExpedicion=res.DATOS.Municipios;
            if(municipioID!=null){
              this.formUser.controls['personaMUNICIPIOEXPEDICION'].setValue(municipioID);
            }
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
      });
    }else{
      this.municipiosExpedicion=[];
    }
  }

 selectPaisExpedicion(paisID,departamentoID=null,municipioID=null){

    if (paisID) {
      this.BaseService.postJson('datosGenerales','departentoPorPais',{paisID:paisID}).subscribe(res=>{
          console.log(res);
          if(res.RESPUESTA=="EXITO"){
            this.departamentosExpedicion=res.DATOS.Departamentos;
            this.municipiosExpedicion=[];
            if(departamentoID!=null){
              this.formUser.controls['departamentoExpedicionID'].setValue(departamentoID);
              this.selectDepartamentoExpedicion(departamentoID,municipioID);
            }
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
      });
    }else{
      this.departamentosExpedicion=[];
      this.municipiosExpedicion=[];
    }
  }

  cargarDatosUsuario(id){
    this.BaseService.postJson('usuario','datosCompletosUsuario',{usuarioID:id}).subscribe(res=>{
        console.log(res);
        if(res.RESPUESTA=="EXITO"){
          this.formUser.controls['usuarioNOMBRE'].setValue(res.DATOS.usuarioNOMBRE);
          this.formUser.controls['usuarioTIPO'].setValue(res.DATOS.usuarioTIPO);
          this.formUser.controls['arlID'].setValue(res.DATOS.arlID);
          this.formUser.controls['cargoID'].setValue(res.DATOS.cargoID);
          this.formUser.controls['colaboradorCORREO'].setValue(res.DATOS.colaboradorCORREO);
          this.formUser.controls['colaboradorFCHINGRESO'].setValue(this.FechaService.formatiar(res.DATOS.colaboradorFCHINGRESO,"YYYY-MM-DD"));
          this.formUser.controls['epsID'].setValue(res.DATOS.epsID);
          this.formUser.controls['fondoPensionID'].setValue(res.DATOS.fondoPensionID);
          this.formUser.controls['unidadFuncionalID'].setValue(res.DATOS.unidadFuncionalID);
          this.formUser.controls['nivelEscolarID'].setValue(res.DATOS.nivelEscolarID);
          this.formUser.controls['personaCELULAR'].setValue(res.DATOS.personaCELULAR);
          this.formUser.controls['personaCORREO'].setValue(res.DATOS.personaCORREO);
          this.formUser.controls['personaDIRECCION'].setValue(res.DATOS.personaDIRECCION);
          this.formUser.controls['personaFCHNACIMIENTO'].setValue(this.FechaService.formatiar(res.DATOS.personaFCHNACIMIENTO,"YYYY-MM-DD"));
          this.formUser.controls['personaIDENTIFICACION'].setValue(res.DATOS.personaIDENTIFICACION);
          this.formUser.controls['personaPRIMERAPELLIDO'].setValue(res.DATOS.personaPRIMERAPELLIDO);
          this.formUser.controls['personaPRIMERNOMBRE'].setValue(res.DATOS.personaPRIMERNOMBRE);
          this.formUser.controls['personaRAZONSOCIAL'].setValue(res.DATOS.personaRAZONSOCIAL);
          this.formUser.controls['personaSEGUNDONOMBRE'].setValue(res.DATOS.personaSEGUNDONOMBRE);
          this.formUser.controls['tipoIdentificacionID'].setValue(res.DATOS.tipoIdentificacionID);
          this.formUser.controls['tipoPersonaID'].setValue(res.DATOS.tipoPersonaID);
          this.formUser.controls['usuarioESTADO'].setValue(res.DATOS.usuarioESTADO);
          this.formUser.controls['usuarioTIPO'].setValue(res.DATOS.usuarioTIPO);
          this.formUser.controls['personaNUMEROHIJOS'].setValue(res.DATOS.personaNUMEROHIJOS);
          this.formUser.controls['personaESTADOCIVIL'].setValue(res.DATOS.personaESTADOCIVIL);
          this.formUser.controls['personaRUT'].setValue(res.DATOS.personaRUT);
          this.formUser.controls['personaGENERO'].setValue(res.DATOS.personaGENERO);
          this.formUser.controls['paisExpedicionID'].setValue(res.DATOS.paiseExpedicionID);
          this.formUser.controls['paisID'].setValue(res.DATOS.paisID);

          this.cambioTipoPersona();
          this.selectUnidad(res.DATOS.unidadFuncionalID,res.DATOS.grupoTrabajoID);
          this.selectPais(res.DATOS.paisID, res.DATOS.departamentoID, res.DATOS.municipioID);
          this.selectPaisExpedicion(res.DATOS.paiseExpedicionID, res.DATOS.departamentoExpedicionID, res.DATOS.municipioExpedicionID);
        }else{
          this.SweetalertService.modal("error",res.MENSAJE);
        }
    });
  }

}
