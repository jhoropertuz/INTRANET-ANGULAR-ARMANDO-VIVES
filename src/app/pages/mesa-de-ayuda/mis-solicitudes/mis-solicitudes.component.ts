import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { TablaBasicaComponent } from 'app/shared/tablas/tabla-basica/tabla-basica.component';


@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements AfterViewInit,OnInit {

  dataTable={};
  mostrarTabla=true;
  @ViewChild(TablaBasicaComponent) TablaBasicaComponent: TablaBasicaComponent;
  constructor(public Router:Router,public BaseService:BaseService, public SweetalertService:SweetalertService){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.TablaBasicaComponent.cargarDatos("MesaDeAyuda","solicitudesPorUsuario",{mesaDeAyudaNIVELPRIORIDAD:'Prioridad', mesaDeAyudaTIPOSOLICITUD:'Tipo', mesaDeAyudaFCHCREO:'FCH Creación', mesaDeAyudaESTADO:'Estado'},'mesaDeAyudaID');
  }

  editar(){
    let elemnt=this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('mesaDeAyuda/editar/'+elemnt);
    }
  }

  ver(){
    let elemnt=this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('mesaDeAyuda/ver/'+elemnt);
    }
  }

}
