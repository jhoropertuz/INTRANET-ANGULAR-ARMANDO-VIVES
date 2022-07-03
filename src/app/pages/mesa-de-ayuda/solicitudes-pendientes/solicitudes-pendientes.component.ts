import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { TablaDatatableComponent } from 'app/shared/tablas/tabla-datatable/tabla-datatable.component';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrls: ['./solicitudes-pendientes.component.css']
})
export class SolicitudesPendientesComponent implements OnInit {
  dataTable = {};
  mostrarTabla = true;
  @ViewChild(TablaDatatableComponent) TablaDatatableComponent: TablaDatatableComponent;
  constructor(public Router: Router, public BaseService: BaseService, public SweetalertService: SweetalertService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.TablaDatatableComponent.cargarDatos("MesaDeAyuda", "solicitudesPendientes", {personaRAZONSOCIAL: 'Funcionario',  mesaDeAyudaNIVELPRIORIDAD: 'Prioridad', mesaDeAyudaTIPOSOLICITUD: 'Tipo', mesaDeAyudaFCHCREO: 'FCH Creación', personasAsignadaRAZONSOCIAL:'Asignado a', mesaDeAyudaESTADO: 'Estado' }, 'mesaDeAyudaID');
  }

  gestionar() {
    let elemnt = this.TablaDatatableComponent.obtenerUnElementoSeleccionado();
    if (elemnt) {
      this.Router.navigateByUrl('mesaDeAyuda/gestionarSolicitud/' + elemnt);
    }
  }

  ver() {
    let elemnt=this.TablaDatatableComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('mesaDeAyuda/ver/'+elemnt);
    }
  }


}
