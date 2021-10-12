import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { Endpoind } from 'app/endpoind';

@Component({
  selector: 'app-documentos-ver',
  templateUrl: './documentos-ver.component.html',
  styleUrls: ['./documentos-ver.component.css']
})
export class DocumentosVerComponent implements OnInit {
  documento;
  cargando = true;
  constructor(public  ActivatedRoute:ActivatedRoute, public BaseService: BaseService, public SweetalertService: SweetalertService, public Router:Router) { }

  ngOnInit(): void {
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");
    if(id){
     this.buscarDocumeto(id);
    }else{
      this.Router.navigateByUrl("documentos");
    }
  }


  buscarDocumeto(id){
    this.BaseService.postJson("GestionDocumental","documentoPorId",{documentoID:id}).subscribe(res=>{
      console.log(res);
      if(res.RESPUESTA=="EXITO"){
        this.documento = res.DATOS;
        this.documento.documentoURL = Endpoind.API_BASE + this.documento.documentoURL;
        this.cargando = false;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
        this.Router.navigateByUrl("documentos");
      }
   });
  }
}
