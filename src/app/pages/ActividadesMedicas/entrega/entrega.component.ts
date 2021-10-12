import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { TablaBasicaComponent } from 'app/shared/tablas/tabla-basica/tabla-basica.component';
import { Endpoind } from 'app/endpoind';
@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {

  dataTable={};
  mostrarTabla=true;
  @ViewChild(TablaBasicaComponent) TablaBasicaComponent: TablaBasicaComponent;
  constructor(public Router:Router,public BaseService:BaseService, public SweetalertService:SweetalertService){
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.TablaBasicaComponent.cargarDatos("ActividadesMedicas","buscarPorUsuario",{personaRAZONSOCIAL:"Asignada a", actividadMedicaColaboradorFCHCREO:'FCH Creación'},'actividadMedicaColaboradorID');
  }

  editar(){
    let elemnt=this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('actividadesMedicas/editar/'+elemnt);
    }
  }

  ver(){
    let elemnt=this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('actividadesMedicas/ver/'+elemnt);
    }
  }

  exportar(){
    let elemnt=this.TablaBasicaComponent.obtenerUnElementoSeleccionado();
    this.BaseService.postJson('ActividadesMedicas','exportarTodosPacientesPorActividadMedicaID', {actividadMedicaColaboradorID:elemnt}).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        let url= Endpoind.API_BASE+res.DATOS.file ;
        console.log(url);
        window.open(url, '_blank');
      }
    });
  }

}
