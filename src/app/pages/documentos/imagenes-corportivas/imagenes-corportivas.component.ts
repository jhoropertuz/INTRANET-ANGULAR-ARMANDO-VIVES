import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListaDocumentosComponent } from 'app/shared/lista-documentos/lista-documentos.component';

@Component({
  selector: 'app-imagenes-corportivas',
  templateUrl: './imagenes-corportivas.component.html',
  styleUrls: ['./imagenes-corportivas.component.css']
})
export class ImagenesCorportivasComponent implements AfterViewInit,OnInit{

  @ViewChild('listaDocumentosSelector') listaDocumentosSelector: ListaDocumentosComponent;
  constructor() { }

  carpetaGuiasPracticas="615BBD8CC9F45-IMAGEN-CORPORATIVA";

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.listaDocumentosSelector.extraerDocumentos(this.carpetaGuiasPracticas);
  }

  eventMostrarPadre(event){
    this.listaDocumentosSelector.extraerDocumentos(this.carpetaGuiasPracticas);
  }

}
