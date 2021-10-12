import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseService } from 'app/servicios/base.service';
import { ListaDocumentosComponent } from 'app/shared/lista-documentos/lista-documentos.component';

@Component({
  selector: 'app-mapa-procesos',
  templateUrl: './mapa-procesos.component.html',
  styleUrls: ['./mapa-procesos.component.css']
})
export class MapaProcesosComponent implements OnInit {
  contenido=false;

  constructor(public BaseService:BaseService) { }
  ngOnInit(): void {

  }
  @ViewChild('listaDocumentosSelector') listaDocumentosSelector: ListaDocumentosComponent;
  eventCarpeta(CarpetaDocumentoCODIGO){
    this.contenido=true;
    this.listaDocumentosSelector.extraerDocumentos(CarpetaDocumentoCODIGO);
  }

  eventMostrarMapa(event){
    this.contenido=false;
  }

}
