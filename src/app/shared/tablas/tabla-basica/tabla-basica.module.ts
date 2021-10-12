import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaBasicaComponent } from './tabla-basica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TablaBasicaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[TablaBasicaComponent]
})
export class TablaBasicaModule { }
