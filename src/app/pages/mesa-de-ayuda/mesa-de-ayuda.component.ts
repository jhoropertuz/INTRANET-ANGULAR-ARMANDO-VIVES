import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { now } from 'moment';

@Component({
  selector: 'app-mesa-de-ayuda',
  templateUrl: './mesa-de-ayuda.component.html',
  styleUrls: ['./mesa-de-ayuda.component.css']
})
export class MesaDeAyudaComponent implements OnInit {

  public formMesaDeAyuda;
  public tituloaccion= "Guardar";

  constructor(
    public  Router:Router,
    public  ActivatedRoute:ActivatedRoute ,
    public SweetalertService:SweetalertService ,
    private fb: FormBuilder,
    public BaseService:BaseService
  ) {
    this.formMesaDeAyuda = this.fb.group({
      mesaDeAyudaTIPOSOLICITUD: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaUBICACIONDELSUCESO: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaNUMEROINVENTARIOEQUIPO: new FormControl(''),
      mesaDeAyudaDESCRIPCION: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaID: new FormControl(''),
      mesaDeAyudaNIVELPRIORIDAD: new FormControl('', Validators.compose([Validators.required])),
      mesaDeAyudaFCHCREO: new FormControl('0000-00-00 00:00:00', Validators.compose([Validators.required]))
    });
   }

  ngOnInit(): void {
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");

    if (id) {
      this.cargarDatosSolicitud(id);
    }
  }

  cargarDatosSolicitud(id){
    this.tituloaccion= "Actualizar";
    this.BaseService.postJson('MesaDeAyuda','solicitudesPorID',{mesaDeAyudaID:id}).subscribe(res=>{
      if (res.RESPUESTA == "EXITO") {
        this.formMesaDeAyuda.controls['mesaDeAyudaTIPOSOLICITUD'].setValue(res.DATOS.mesaDeAyudaTIPOSOLICITUD);
        this.formMesaDeAyuda.controls['mesaDeAyudaUBICACIONDELSUCESO'].setValue(res.DATOS.mesaDeAyudaUBICACIONDELSUCESO);
        this.formMesaDeAyuda.controls['mesaDeAyudaNUMEROINVENTARIOEQUIPO'].setValue(res.DATOS.mesaDeAyudaNUMEROINVENTARIOEQUIPO);
        this.formMesaDeAyuda.controls['mesaDeAyudaDESCRIPCION'].setValue(res.DATOS.mesaDeAyudaDESCRIPCION);
        this.formMesaDeAyuda.controls['mesaDeAyudaID'].setValue(res.DATOS.mesaDeAyudaID);
        this.formMesaDeAyuda.controls['mesaDeAyudaNIVELPRIORIDAD'].setValue(res.DATOS.mesaDeAyudaNIVELPRIORIDAD);
        this.formMesaDeAyuda.controls['mesaDeAyudaFCHCREO'].setValue(res.DATOS.mesaDeAyudaFCHCREO);
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

  enviarSolicitud(formValue){
    this.BaseService.postJson("MesaDeAyuda", "guardar", formValue).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        this.SweetalertService.notificacion("success",res.MENSAJE);
        this.Router.navigateByUrl('/mesaDeAyuda/misSolicitudes');
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

}
