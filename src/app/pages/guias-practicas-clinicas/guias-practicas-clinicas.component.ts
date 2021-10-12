import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListaDocumentosComponent } from 'app/shared/lista-documentos/lista-documentos.component';

@Component({
  selector: 'app-guias-practicas-clinicas',
  templateUrl: './guias-practicas-clinicas.component.html',
  styleUrls: ['./guias-practicas-clinicas.component.css']
})
export class GuiasPracticasClinicasComponent implements AfterViewInit,OnInit {
  @ViewChild('listaDocumentosSelector') listaDocumentosSelector: ListaDocumentosComponent;
  constructor() { }

  carpetaGuiasPracticas="60DFE95E26368-GUIAS_DE_PRACTICA_CLINICA";

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.listaDocumentosSelector.extraerDocumentos(this.carpetaGuiasPracticas);
  }

  eventMostrarPadre(event){
    this.listaDocumentosSelector.extraerDocumentos(this.carpetaGuiasPracticas);
  }

}
