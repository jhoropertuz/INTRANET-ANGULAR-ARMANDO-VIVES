import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaDocumentosComponent } from './lista-documentos.component';
import { CargandoSonarModule } from '../cargando-sonar/cargando-sonar.module';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListaDocumentosComponent],
  imports: [
    CommonModule,
    CargandoSonarModule,
    NgxDocViewerModule,
    ReactiveFormsModule
  ],
  exports:[ListaDocumentosComponent]
})
export class ListaDocumentosModule { }
