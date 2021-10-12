import { Component, Input, OnInit } from '@angular/core';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import {ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-tabla-basica',
  templateUrl: './tabla-basica.component.html',
  styleUrls: ['./tabla-basica.component.css']
})
export class TablaBasicaComponent implements OnInit {
  public tableData;
  public columnas;
  public keys;
  public idItem;
  mostrarTablas=false;
  formCheckbox:FormGroup;
  constructor(private formBuilder: FormBuilder,private cdref: ChangeDetectorRef ,public BaseService:BaseService, public SweetalertService:SweetalertService) {
    this.formCheckbox = this.formBuilder.group({
      checkboxElemen: this.formBuilder.array([], [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  cargarDatos(componente,operacion,colum,idItem){
    this.idItem=idItem;
    this.keys=Object.keys(colum);
    this.columnas=Object.values(colum);
    this.BaseService.postJson(componente,operacion,{}).subscribe(res=>{
      if (res.RESPUESTA=="EXITO") {
        this.tableData=res.DATOS;
      }else{
         this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
    this.mostrarTablas=true;
    this.cdref.detectChanges();
  }

  selectElemto(e){
    const checkboxElemen: FormArray = this.formCheckbox.get('checkboxElemen') as FormArray;
    if (e.target.checked) {
      checkboxElemen.push(new FormControl(e.target.value));
    } else {
       const index = checkboxElemen.controls.findIndex(x => x.value === e.target.value);
       checkboxElemen.removeAt(index);
    }
    console.log(this.formCheckbox.value);
  }

  obtenerVariosElemntosSeleccionados(){
    if(this.formCheckbox.value.checkboxElemen.length>0){
      return this.formCheckbox.value.checkboxElemen;
    }else{
      this.SweetalertService.modal("info","Por favor seleccione por lo menos un elemento.");
      return false;
    }
  }

  obtenerUnElementoSeleccionado(){
    if(this.formCheckbox.value.checkboxElemen.length>0){
      if(this.formCheckbox.value.checkboxElemen.length==1){
        return this.formCheckbox.value.checkboxElemen[0];
      }else{
        this.SweetalertService.modal("info","Por favor seleccione un solo elemento.");
      }
    }else{
      this.SweetalertService.modal("info","Por favor seleccione un elemento.");
    }
    return false;
  }



}
