import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { FechaService } from 'app/servicios/fecha.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { Endpoind } from 'app/endpoind';
@Component({
  selector: 'app-documentos-form',
  templateUrl: './documentos-form.component.html',
  styleUrls: ['./documentos-form.component.css']
})
export class DocumentosFormComponent implements OnInit {
  public Titulo="Documento";
  tituloaccion="";
  formDocumentos;
  TituloArchivo="Cargar Archivo ..";
  file;
  carpetas=[];
  documentoURL="";

  constructor(public Router:Router,public FechaService: FechaService ,public  ActivatedRoute:ActivatedRoute ,public SweetalertService:SweetalertService ,private fb: FormBuilder, public BaseService:BaseService) {
    this.formDocumentos=this.fb.group({
      documentoTITULO: new FormControl('', Validators.compose([Validators.required])),
      carpetaDocumentoID: new FormControl('', Validators.compose([Validators.required])),
      documentoESTADO: new FormControl('', Validators.compose([Validators.required])),
      documentoArchivo:  new FormControl(''),
      documentoID:  new FormControl('')
    });
   }

  ngOnInit(): void {
    this.cargarDatosEntrada();
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");
    if(id){
      this.Titulo="Actualizar Documento";
      this.tituloaccion="Actualizar";
      this.cargarDatosDocumento(id);
    }else{
      this.Titulo="Crear Documento"
      this.tituloaccion="Guardar";
    }
  }

  cargarDatosDocumento(id){
   this.BaseService.postJson("GestionDocumental","documentoPorId",{documentoID:id}).subscribe(res=>{
     this.formDocumentos.controls['documentoTITULO'].setValue(res.DATOS.documentoTITULO);
     this.formDocumentos.controls['carpetaDocumentoID'].setValue(res.DATOS.carpetaDocumentoID);
     this.formDocumentos.controls['documentoESTADO'].setValue(res.DATOS.documentoESTADO);
     this.formDocumentos.controls['documentoID'].setValue(res.DATOS.documentoID);
     this.documentoURL=Endpoind.API_BASE+res.DATOS.documentoURL;
   });
  }

  enviarPeticion(value){
    console.log(value);
    let formData = new FormData();
		formData.append('carpetaDocumentoID',value.carpetaDocumentoID);
    formData.append('documentoID',value.documentoID);
    formData.append('documentoTITULO',value.documentoTITULO);
    formData.append('documentoESTADO',value.documentoESTADO);
    if(this.file){
      formData.append('documentoArchivo',this.file,this.file.name);
    }
    this.BaseService.postFormData("GestionDocumental","guardarDocumento",formData).subscribe(res=>{
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

  cargandoFile(file){
    console.log(file);
    if(file){
      this.file=file;
      this.TituloArchivo=file.name;
    }else{
      this.SweetalertService.modal("ERROR","Archivo no valido. ");
    }

  }

  eliminar(){
      let documentoID=this.formDocumentos.get("documentoID").value;
      this.BaseService.postJson("GestionDocumental","eliminarDocumento",{documentoID:documentoID}).subscribe(res=>{
        console.log(res);
        if(res.RESPUESTA=="EXITO"){
           this.SweetalertService.notificacion("success",res.MENSAJE);
           this.Router.navigateByUrl("documentos");
        }else{
          this.SweetalertService.modal("error",res.MENSAJE);
        }
     });
  }

}
