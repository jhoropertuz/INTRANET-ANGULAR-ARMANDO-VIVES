import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { FechaService } from 'app/servicios/fecha.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { Endpoind } from 'app/endpoind';

@Component({
  selector: 'app-nueva-carpeta',
  templateUrl: './nueva-carpeta.component.html',
  styleUrls: ['./nueva-carpeta.component.css']
})
export class NuevaCarpetaComponent implements OnInit {

  public Titulo="Carpetas";
  tituloaccion="";
  formCarpeta;

  carpetas=[];

  constructor(public Router:Router,public FechaService: FechaService ,public  ActivatedRoute:ActivatedRoute ,public SweetalertService:SweetalertService ,private fb: FormBuilder, public BaseService:BaseService) {
    this.formCarpeta=this.fb.group({
      carpetaDocumentoTITULO: new FormControl('', Validators.compose([Validators.required])),
      carpetaDocumentoPADRE: new FormControl('', Validators.compose([Validators.required])),
      carpetaDocumentoESTADO: new FormControl('', Validators.compose([Validators.required])),
      carpetaDocumentoID:  new FormControl('')
    });
   }

  ngOnInit(): void {
    this.cargarDatosEntrada();
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.Titulo="Actualizar Carpeta";
      this.tituloaccion="Actualizar";
      this.cargarDatosDocumento(id);
    }else{
      this.Titulo="Crear Carpeta"
      this.tituloaccion="Guardar";
    }
  }

  cargarDatosDocumento(id){
   this.BaseService.postJson("GestionDocumental","documentoPorId",{documentoID:id}).subscribe(res=>{
     this.formCarpeta.controls['documentoTITULO'].setValue(res.DATOS.documentoTITULO);
     this.formCarpeta.controls['carpetaDocumentoID'].setValue(res.DATOS.carpetaDocumentoID);
     this.formCarpeta.controls['documentoESTADO'].setValue(res.DATOS.documentoESTADO);
     this.formCarpeta.controls['documentoID'].setValue(res.DATOS.documentoID);
   });
  }

  enviarPeticion(value){
    this.BaseService.postJson("GestionDocumental","guardarCarpeta",value).subscribe(res=>{
       console.log(res);
       if(res.RESPUESTA=="EXITO"){
          this.SweetalertService.notificacion("success",res.MENSAJE);
          this.Router.navigateByUrl("documentos");
       }else{
         this.SweetalertService.modal("error",res.MENSAJE);
       }
    });

  }

  cargarDatosEntrada(){
    this.BaseService.postJson("DatosGenerales","datosEntradaDocumentos").subscribe(res=>{
      console.log(res);
      if(res.RESPUESTA="EXITO"){
        this.carpetas=res.DATOS.Carpetas;
      }else{
        this.SweetalertService.modal("ERROR","Error al cargar los datos iniciales. ")
      }
    });
  }

}
