import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { Endpoind } from 'app/endpoind';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';

@Component({
  selector: 'app-documentos-ver',
  templateUrl: './documentos-ver.component.html',
  styleUrls: ['./documentos-ver.component.css']
})
export class DocumentosVerComponent implements OnInit {
  estudianteUsuario
  documento;
  cargando = true;
  constructor(public UsuarioLogiadoService: UsuarioLogiadoService,public  ActivatedRoute:ActivatedRoute, public BaseService: BaseService, public SweetalertService: SweetalertService, public Router:Router) { }

  ngOnInit(): void {
    this.estudianteUsuario = this.UsuarioLogiadoService.estudianteUsuario();
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

        if (this.estudianteUsuario) {
          this.documento.documentoURL += "#toolbar=0";
        }
        this.cargando = false;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
        this.Router.navigateByUrl("documentos");
      }
   });
  }
}
