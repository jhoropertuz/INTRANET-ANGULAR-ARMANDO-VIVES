import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { TablaBasicaComponent } from 'app/shared/tablas/tabla-basica/tabla-basica.component';
import { TablaDatatableComponent } from 'app/shared/tablas/tabla-datatable/tabla-datatable.component';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements AfterViewInit,OnInit{
  dataTable={};
  mostrarTabla=true;
  @ViewChild(TablaDatatableComponent) TablaDatatableComponent: TablaDatatableComponent;
  constructor(public Router:Router,public BaseService:BaseService, public SweetalertService:SweetalertService){
  }
  ngOnInit(){

  }

  ngAfterViewInit() {
    this.TablaDatatableComponent.cargarDatos("usuario","todosFiltro",{usuarioNOMBRE:'Usuario', usuarioTIPO:'Tipo', usuarioFCHCREO:'FCH Creación', usuarioESTADO:'Estado'},'usuarioID');
  }

  editar(){
    let elemnt=this.TablaDatatableComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('user/editar/'+elemnt);
    }
  }

  nuevo(){
    this.Router.navigateByUrl('user/nuevo');
  }

  permisos(){
    let elemnt=this.TablaDatatableComponent.obtenerUnElementoSeleccionado();
    if(elemnt){
      this.Router.navigateByUrl('user/permisos/'+elemnt);
    }
  }

  importar(){
    this.BaseService.postJson("usuario","importarExcel").subscribe(res=>{
      if (res.RESPUESTA=="EXITO") {
        this.SweetalertService.notificacion("success", "Importacion exitosa.")
      }
    });
  }

}
