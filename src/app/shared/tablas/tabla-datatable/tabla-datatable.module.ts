import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDatatableComponent } from './tabla-datatable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [TablaDatatableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    TablaDatatableComponent
  ]
})
export class TablaDatatableModule { }
