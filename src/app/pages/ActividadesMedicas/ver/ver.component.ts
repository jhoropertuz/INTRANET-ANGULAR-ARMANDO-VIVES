import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'app/servicios/base.service';
import { FechaService } from 'app/servicios/fecha.service';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';
import { Endpoind } from 'app/endpoind';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  datos;
  cargando=true;
  id;
  actividadMedica;
  pacientes;

  constructor(
    public UsuarioLogiadoService:UsuarioLogiadoService,
    public  Router:Router,
    public FechaService: FechaService ,
    public  ActivatedRoute:ActivatedRoute ,
    public SweetalertService:SweetalertService ,
    private fb: FormBuilder,
    public BaseService:BaseService,
    public LocalStorageService:LocalStorageService,
    private modalService: NgbModal
    ) {
    }

  ngOnInit(): void {
    this.id=this.ActivatedRoute.snapshot.paramMap.get("id");
    if(this.id){
      this.cargarDatosDeActividadMedica(this.id);
    }else{
      this.Router.navigateByUrl("/");
    }
  }

  cargarDatosDeActividadMedica(id){
    this.BaseService.postJson('ActividadesMedicas','buscarTodosPacientesPorActividadMedicaID',{actividadMedicaColaboradorID:id}).subscribe(res=>{
      console.log(res);
      if(res.RESPUESTA=="EXITO"){
        this.actividadMedica = res.DATOS.ActividadMedica;
        this.pacientes = res.DATOS.Pacientes;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
      this.cargando=false;
  });
  }

  exportar(){
    let elemnt=this.id;
    this.BaseService.postJson('ActividadesMedicas','exportarTodosPacientesPorActividadMedicaID', {actividadMedicaColaboradorID:elemnt}).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        let url= Endpoind.API_BASE+res.DATOS.file ;
        console.log(url);
        window.open(url, '_blank');
      }
    });
  }

}
