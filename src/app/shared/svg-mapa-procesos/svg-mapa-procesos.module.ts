import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgMapaProcesosComponent } from './svg-mapa-procesos.component';



@NgModule({
  declarations: [SvgMapaProcesosComponent],
  imports: [
    CommonModule
  ],
  exports:[
    SvgMapaProcesosComponent
  ]
})
export class SvgMapaProcesosModule { }
