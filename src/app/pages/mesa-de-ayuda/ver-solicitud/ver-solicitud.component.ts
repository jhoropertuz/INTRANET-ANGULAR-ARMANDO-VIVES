import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {
  public datosSolicitud;

  constructor(
    public  Router:Router,
    public  ActivatedRoute:ActivatedRoute ,
    public SweetalertService:SweetalertService ,
    public BaseService:BaseService
  ) {
   }

  ngOnInit(): void {
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");

    if (id) {
      this.cargarDatosSolicitud(id);
    }else{
      this.Router.navigateByUrl("/");
    }
  }

  cargarDatosSolicitud(id){
    this.BaseService.postJson('MesaDeAyuda','solicitudesPorID',{mesaDeAyudaID:id}).subscribe(res=>{
      if (res.RESPUESTA == "EXITO") {
        this.datosSolicitud = res.DATOS;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

}
