import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ListaDocumentosComponent } from 'app/shared/lista-documentos/lista-documentos.component';

@Component({
  selector: 'app-horarios-medico',
  templateUrl: './horarios-medico.component.html',
  styleUrls: ['./horarios-medico.component.css']
})
export class HorariosMedicoComponent implements AfterViewInit, OnInit {



    @ViewChild('listaDocumentosSelector') listaDocumentosSelector: ListaDocumentosComponent;
    constructor() { }
  
    carpetaGuiasPracticas="615DA6B7E99B4-HORARIO-DE-MEDICOS";
  
    ngOnInit(): void {
  
    }
  
    ngAfterViewInit(){
      this.listaDocumentosSelector.extraerDocumentos(this.carpetaGuiasPracticas);
    }
  
    eventMostrarPadre(event){
      this.listaDocumentosSelector.extraerDocumentos(this.carpetaGuiasPracticas);
    }
  
  }
  