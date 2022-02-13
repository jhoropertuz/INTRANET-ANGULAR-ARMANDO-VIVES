
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Endpoind } from 'app/endpoind';
import { BaseService } from 'app/servicios/base.service';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import {ChangeDetectorRef } from '@angular/core';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';
@Component({
  selector: 'app-lista-documentos',
  templateUrl: './lista-documentos.component.html',
  styleUrls: ['./lista-documentos.component.css']
})
export class ListaDocumentosComponent implements OnInit {
  estudianteUsuario;
  carpetas=[];
  documentos=[];
  carpetasTodos=[];
  documentosTodos=[];
  countCarpetas=0;
  countDocumentos=0;
  textoInformativo:boolean=false;
  carpetaActual;
  contenido=false;
  rutas=[];
  documentoVisualizar='';
  cargando=true;
  formCheckbox:FormGroup;
  formBuscar:FormGroup;
  @Output() mostrarPadre = new EventEmitter();
  constructor(public UsuarioLogiadoService: UsuarioLogiadoService, private cdref: ChangeDetectorRef,private formBuilder: FormBuilder,private BaseService:BaseService, public SweetalertService:SweetalertService, public LocalStorageService:LocalStorageService) {
    this.formCheckbox = this.formBuilder.group({
      checkboxDocumentos: this.formBuilder.array([], [Validators.required])
    });
    this.formBuscar = this.formBuilder.group({
      inputBuscar: new FormControl('')
    })
  }

  onCheckboxChange(e) {
    const checkboxDocumentos: FormArray = this.formCheckbox.get('checkboxDocumentos') as FormArray;
    if (e.target.checked) {
      checkboxDocumentos.push(new FormControl(e.target.value));
    } else {
       const index = checkboxDocumentos.controls.findIndex(x => x.value === e.target.value);
       checkboxDocumentos.removeAt(index);
    }
    console.log(this.formCheckbox.value);
  }

  ngOnInit(): void {

    this.estudianteUsuario = this.UsuarioLogiadoService.estudianteUsuario();
    this.formBuscar.get("inputBuscar").valueChanges.subscribe(res=>{
      console.log(res);
      if(res.length>3 && res.trim() !== ''){
        this.documentos=this.documentosTodos.filter(item=>{
            return ( item.documentoTITULO.toString().toLowerCase().indexOf(res.toString().toLowerCase())>-1);
        });
        this.carpetas=this.carpetasTodos.filter(item=>{
          return ( item.carpetaDocumentoTITULO.toString().toLowerCase().indexOf(res.toString().toLowerCase())>-1);
        });

        console.log(this.documentos);
        console.log(this.documentosTodos);
      }else{
        this.documentos=this.documentosTodos;
        this.carpetas=this.carpetasTodos;
      }

      this.countCarpetas=this.carpetas.length;
      this.countDocumentos=this.documentos.length;

    });
  }

  extraerDocumentos(carpetaDocumentoCODIGO){
    this.contenido=true;
    this.cargando=true;
    this.documentoVisualizar='';
    if(carpetaDocumentoCODIGO){
      this.BaseService.postJson("gestionDocumental","mostrarDocumentosPorCarpetaCodigo",{carpetaDocumentoCODIGO:carpetaDocumentoCODIGO}).subscribe(res=>{
        if(res.RESPUESTA=="EXITO"){
          this.carpetaActual=res.DATOS.carpetaActual;
            if(res.DATOS.carpetas.length > 0 || res.DATOS.documentos.length > 0){
              this.textoInformativo=false;
              this.carpetas=res.DATOS.carpetas;
              this.documentos=res.DATOS.documentos;
              this.carpetasTodos=this.carpetas;
              this.documentosTodos=this.documentos;
              this.countCarpetas=this.carpetas.length;
              this.countDocumentos=this.documentos.length;
              let considenciaRuta=false;
              this.rutas.forEach( (ruta, index, rutas)=>{
                if(ruta.carpetaID == this.carpetaActual.carpetaDocumentoID){
                  considenciaRuta=true;
                }
                if(considenciaRuta){
                  rutas.splice(index+1, 1);
                }
              });
              if (!considenciaRuta) {
                this.rutas.push({carpetaDocumentoCODIGO: this.carpetaActual.carpetaDocumentoCODIGO , carpetaID: this.carpetaActual.carpetaDocumentoID, carpetaDocumentoTITULO: this.carpetaActual.carpetaDocumentoTITULO,carpetaDocumentoURL:this.carpetaActual.carpetaDocumentoURL});
              }
            }else{
              /* this.rutas.push({carpetaID: this.carpetaActual.carpetaDocumentoID, carpetaDocumentoTITULO: this.carpetaActual.carpetaDocumentoTITULO,carpetaDocumentoURL:this.carpetaActual.carpetaDocumentoURL}); */
              this.textoInformativo=true;
              this.SweetalertService.notificacion("info","No se encontraron documentos.");
            }
          }else{
            this.eventoMostrarPadre();
            this.SweetalertService.modal("error",res.MENSAJE,"Error");
          }
          this.cargando=false;
      });
    }else{
      this.eventoMostrarPadre();
      this.SweetalertService.modal("error","Este modulo no tiene un codigo de carpeta asignado","Error");
    }
    this.cdref.detectChanges();
  }


  eventoMostrarPadre(){
    this.contenido=false;
    this.rutas=[];
    this.documentos=[];
    this.carpetas=[];
    this.mostrarPadre.emit("");
  }

  verDocumento(){
    let documentosSeleccionados=this.formCheckbox.value.checkboxDocumentos;
    if(documentosSeleccionados.length==1){
      console.log(documentosSeleccionados);
      let usuario=this.LocalStorageService.getDatoJson("usuario");
      this.BaseService.postJson("gestionDocumental","registrarAccionesDocumentosUsuario",{usuarioID:usuario.usuarioID,arrayDocumentosID:documentosSeleccionados,accionUsuario:"VER"}).subscribe(res=>{
        console.log(res);
        if(res.RESPUESTA=="EXITO"){
          this.limpiarLista();
          this.documentoVisualizar=this.obtenerUrlDocumento(res.DATOS[0].documentoURL) ;
          if (this.estudianteUsuario) {
            this.documentoVisualizar += "#toolbar=0";
          }
        }else{
          this.SweetalertService.modal("error","No se pudo registrar la acción.","Error");
        }
      });
    }else{
      this.SweetalertService.notificacion("info","Debe seleccionar un solo elemento.");
    }

  }

  descargarDocumento(){
    let documentosSeleccionados=this.formCheckbox.value.checkboxDocumentos;
    if(documentosSeleccionados.length==1){
      let usuario=this.LocalStorageService.getDatoJson("usuario");
      this.BaseService.postJson("gestionDocumental","registrarAccionesDocumentosUsuario",{usuarioID:usuario.usuarioID,arrayDocumentosID:documentosSeleccionados,accionUsuario:"DESCARGA"}).subscribe(res=>{
        console.log(res);
        if(res.RESPUESTA=="EXITO" && res.DATOS.length > 0){
          res.DATOS.forEach(documento => {
            let url=this.obtenerUrlDocumento(documento.documentoURL);

            window.open(url, 'Download');
          });
        }else{
          this.SweetalertService.modal("error",res.MENSAJE,"Error");
        }
      });
    }else{
      this.SweetalertService.notificacion("info","Debe seleccionar un solo documento.");
    }
  }


  obtenerUrlDocumento(documentoURL){
   /*  var urlDocumento="";
    for (let index = 0; index < this.rutas.length; index++) {
      const element = this.rutas[index];
      urlDocumento = urlDocumento + element.carpetaDocumentoURL+"/";
    } */
    let url= Endpoind.API_BASE+documentoURL ;
    return url;
  }


  limpiarLista(){
    const checkboxDocumentos: FormArray = this.formCheckbox.get('checkboxDocumentos') as FormArray;
    const index = checkboxDocumentos.controls.forEach(x =>{ checkboxDocumentos.removeAt(0)} );
  }



}
