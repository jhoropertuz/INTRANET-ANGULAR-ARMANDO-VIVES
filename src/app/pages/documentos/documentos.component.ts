import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';
import { TablaDatatableComponent } from 'app/shared/tablas/tabla-datatable/tabla-datatable.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements AfterViewInit,OnInit {
  formDocumentos;
  userAdmin;
  @ViewChild(TablaDatatableComponent) TablaDatatableComponent: TablaDatatableComponent;
  constructor(public Router:Router, public UsuarioLogiadoService:UsuarioLogiadoService) {}

  ngOnInit(): void {
    this.userAdmin = this.UsuarioLogiadoService.adminUsuario();
  }

  ngAfterViewInit() {
    this.TablaDatatableComponent.cargarDatos("GestionDocumental","todosDocumentosFiltro",{documentoTITULO:'Titulo',documentoTIPO:'Tipo',carpetaDocumentoTITULO:'Carpeta', documentoFCHCREO:'FCH Creación', documentoESTADO:'Estado'},'documentoID');
  }

  editar(){
    let elemen=this.TablaDatatableComponent.obtenerUnElementoSeleccionado();
    if(elemen){
      this.Router.navigateByUrl('documentos/editar/'+elemen);
    }
  }

  nuevo(){
    this.Router.navigateByUrl('documentos/nuevo');
  }

  ver(){
    let elemen=this.TablaDatatableComponent.obtenerUnElementoSeleccionado();
    if(elemen){
      this.Router.navigateByUrl('documentos/ver/'+elemen);
    }
  }

}
