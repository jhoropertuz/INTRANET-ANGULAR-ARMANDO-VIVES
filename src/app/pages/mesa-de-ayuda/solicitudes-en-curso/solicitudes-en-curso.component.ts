import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { TablaBasicaComponent } from 'app/shared/tablas/tabla-basica/tabla-basica.component';

@Component({
  selector: 'app-solicitudes-en-curso',
  templateUrl: './solicitudes-en-curso.component.html',
  styleUrls: ['./solicitudes-en-curso.component.css']
})
export class SolicitudesEnCursoComponent implements OnInit {

  dataTable = {};
  mostrarTabla = true;
  @ViewChild(TablaBasicaComponent) TablaBasicaComponent: TablaBasicaComponent;
  constructor(public Router: Router, public BaseService: BaseService, public SweetalertService: SweetalertService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.TablaBasicaComponent.cargarDatos("MesaDeAyuda", "solicitudesEnCurso", {personaRAZONSOCIAL: 'Funcionario',  mesaDeAyudaNIVELPRIORIDAD: 'Prioridad', mesaDeAyudaTIPOSOLICITUD: 'Tipo', mesaDeAyudaFCHCREO: 'FCH Creación', personasAsignadaRAZONSOCIAL:'Asignado a', mesaDeAyudaESTADO: 'Estado' }, 'mesaDeAyudaID');
  }

  gestionar() {
    let elemnt = this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    if (elemnt) {
      this.Router.navigateByUrl('mesaDeAyuda/gestionarSolicitud/' + elemnt);
    }
  }

  ver() {
    let elemnt=this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('mesaDeAyuda/ver/'+elemnt);
    }
  }

}
