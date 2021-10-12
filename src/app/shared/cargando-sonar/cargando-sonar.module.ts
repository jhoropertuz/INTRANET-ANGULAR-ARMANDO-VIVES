import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargandoSonarComponent } from './cargando-sonar.component';



@NgModule({
  declarations: [CargandoSonarComponent],
  imports: [
    CommonModule
  ],
  exports: [ CargandoSonarComponent ]
})
export class CargandoSonarModule { }
