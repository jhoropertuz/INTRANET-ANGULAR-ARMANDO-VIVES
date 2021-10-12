import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';

@Component({
  selector: 'app-validador-de-colaborador',
  templateUrl: './validador-de-colaborador.component.html',
  styleUrls: ['./validador-de-colaborador.component.css']
})
export class ValidadorDeColaboradorComponent implements OnInit {
  persona;
  personaNoEncontrada=false;
  constructor(public SweetalertService:SweetalertService, public Router:Router, public ActivatedRoute:ActivatedRoute, public BaseService:BaseService) { }

  ngOnInit(): void {
    let identificacion=this.ActivatedRoute.snapshot.paramMap.get("identificacion");
    if(identificacion){
      this.buscarColaborador(identificacion);
    }
  }

  buscarColaborador(identificacion){
    this.BaseService.postJson("Colaborador", "colaboradorPorIdentificacion",{identificacion:identificacion}).subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        //this.SweetalertService.modal("success",res.MENSAJE);
        this.personaNoEncontrada=false;
        this.persona = res.DATOS;
      }else{
        this.personaNoEncontrada=true;
        this.SweetalertService.modal("error",res.MENSAJE);
      }
    });
  }

}
