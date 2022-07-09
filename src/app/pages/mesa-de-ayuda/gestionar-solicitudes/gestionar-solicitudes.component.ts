import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';

@Component({
  selector: 'app-gestionar-solicitudes',
  templateUrl: './gestionar-solicitudes.component.html',
  styleUrls: ['./gestionar-solicitudes.component.css']
})
export class GestionarSolicitudesComponent implements OnInit {
  public formMesaDeAyuda;
  public tituloaccion= "Actualizar";
  public funcionarioAtencion = [];
  showInputFechaFinalizacion = false;

  tiposDeSolicitudes = [];
  ubicaciones = [];

  constructor(
    public  Router:Router,
    public  ActivatedRoute:ActivatedRoute ,
    public SweetalertService:SweetalertService ,
    private fb: FormBuilder,
    public BaseService:BaseService
  ) {
    this.formMesaDeAyuda = this.fb.group({
      mesaDeAyudaTipoDeSolicitudID: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaUbicacionID: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaNUMEROINVENTARIOEQUIPO: new FormControl(''),
      mesaDeAyudaDESCRIPCION: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaID: new FormControl(''),
      mesaDeAyudaNIVELPRIORIDAD: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaCOLABORADORASIGNADO: new FormControl(''),
      mesaDeAyudaESTADO: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaFCHFINALIZACION: new FormControl(''),
      mesaDeAyudaNOTA: new FormControl('')
    });
   }

  ngOnInit(): void {
    const id=this.ActivatedRoute.snapshot.paramMap.get("id");
    this.cargarDatosIniciales();
    if (id) {
      this.BaseService.postJson('MesaDeAyuda','formDatosDeEntrada').subscribe(res=>{
        if (res.RESPUESTA == "EXITO") {
          this.tiposDeSolicitudes = res.DATOS.MesaDeAyudaTiposDeSolicitudes;
          this.ubicaciones = res.DATOS.MesaDeAyudaUbicaciones;
          this.cargarDatosSolicitud(id);
        }else{
          this.SweetalertService.modal("error",res.MENSAJE);
        }
      });
    }else{
      this.Router.navigateByUrl("/");
    }
  }

  cargarDatosIniciales(){
    this.BaseService.postJson('colaborador','colaboradoresPorGruposDeTrabajo',{grupoTrabajoID:16}).subscribe(res=>{
      this.funcionarioAtencion=res.DATOS;
    });

  }

  cargarDatosSolicitud(id){
    this.BaseService.postJson('MesaDeAyuda','solicitudesPorID',{mesaDeAyudaID:id}).subscribe(res=>{
      if (res.RESPUESTA == "EXITO") {
        if (res.DATOS.mesaDeAyudaESTADO=="FINALIZADA") {
          this.SweetalertService.modal("info","La soliciud seleccionada se encuentra finalizada.");
          this.Router.navigateByUrl("mesaDeAyuda/solicitudes");
        }
        this.formMesaDeAyuda.controls['mesaDeAyudaTipoDeSolicitudID'].setValue(res.DATOS.mesaDeAyudaTipoDeSolicitudID);
        this.formMesaDeAyuda.controls['mesaDeAyudaUbicacionID'].setValue(res.DATOS.mesaDeAyudaUbicacionID);
        this.formMesaDeAyuda.controls['mesaDeAyudaNUMEROINVENTARIOEQUIPO'].setValue(res.DATOS.mesaDeAyudaNUMEROINVENTARIOEQUIPO);
        this.formMesaDeAyuda.controls['mesaDeAyudaDESCRIPCION'].setValue(res.DATOS.mesaDeAyudaDESCRIPCION);
        this.formMesaDeAyuda.controls['mesaDeAyudaID'].setValue(res.DATOS.mesaDeAyudaID);
        this.formMesaDeAyuda.controls['mesaDeAyudaNIVELPRIORIDAD'].setValue(res.DATOS.mesaDeAyudaNIVELPRIORIDAD);
        this.formMesaDeAyuda.controls['mesaDeAyudaCOLABORADORASIGNADO'].setValue(
          (res.DATOS.mesaDeAyudaCOLABORADORASIGNADO)? res.DATOS.mesaDeAyudaCOLABORADORASIGNADO : ""
          );
        this.formMesaDeAyuda.controls['mesaDeAyudaESTADO'].setValue(res.DATOS.mesaDeAyudaESTADO);
        this.formMesaDeAyuda.controls['mesaDeAyudaNOTA'].setValue(res.DATOS.mesaDeAyudaNOTA);

      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

  actulizarSolicitud(formValue){
    this.BaseService.postJson("MesaDeAyuda", "actualzarGestion", formValue).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        this.SweetalertService.notificacion("success",res.MENSAJE);
        this.Router.navigateByUrl('/mesaDeAyuda/solicitudes');
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

  accionEstadoFinalizada(estado){
    if (estado=="FINALIZADA") {
      this.showInputFechaFinalizacion = true;
      return;
    }

    this.showInputFechaFinalizacion = false;
  }


}
