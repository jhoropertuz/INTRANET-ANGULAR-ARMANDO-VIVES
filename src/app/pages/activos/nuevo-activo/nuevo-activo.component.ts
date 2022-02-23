import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'app/servicios/base.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';

@Component({
  selector: 'app-nuevo-activo',
  templateUrl: './nuevo-activo.component.html',
  styleUrls: ['./nuevo-activo.component.css']
})
export class NuevoActivoComponent implements OnInit {

  public fromActivos;
  tipoActivos;
  activosCategotias;
  public tituloaccion = "Guardar";

  constructor(
    public Router: Router,
    public ActivatedRoute: ActivatedRoute,
    public SweetalertService: SweetalertService,
    private fb: FormBuilder,
    public BaseService: BaseService
  ) {
    this.fromActivos = this.fb.group({
      activoSERIAL: new FormControl(''),
      activoMARCA: new FormControl(''),
      activoNUMEROPLACA: new FormControl(''),
      personaIDENTIFICACION: new FormControl(''),
      activoCategoriaID: new FormControl(''),
      tipoActivoID: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    /* let id=this.ActivatedRoute.snapshot.paramMap.get("id");

    if (id) {
      this.cargarDatosSolicitud(id);
    } */
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    this.BaseService.postJson('activos', 'buscarActivosCategoria').subscribe(res => {
      if (res.RESPUESTA == "EXITO") {
        this.activosCategotias = res.DATOS.ActivosCategotia;
      } else {
        this.SweetalertService.modal("error", res.MENSAJE);
      }
    });
  }

  changeCategoria() {
    let id = this.fromActivos.controls['activoCategoriaID'].value;
    this.BaseService.postJson('activos', 'buscarTipoDeActivosPorCategoria', { activoCategoriaID: id }).subscribe(res => {
      if (res.RESPUESTA == "EXITO") {
        this.tipoActivos = res.DATOS;
      } else {
        this.SweetalertService.modal("error", res.MENSAJE);
      }
    });
  }

  cargarDatosSolicitud(id) {
    this.tituloaccion = "Actualizar";
    this.BaseService.postJson('MesaDeAyuda', 'solicitudesPorID', { mesaDeAyudaID: id }).subscribe(res => {
      if (res.RESPUESTA == "EXITO") {
        this.fromActivos.controls['mesaDeAyudaTIPOSOLICITUD'].setValue(res.DATOS.mesaDeAyudaTIPOSOLICITUD);
        this.fromActivos.controls['mesaDeAyudaUBICACIONDELSUCESO'].setValue(res.DATOS.mesaDeAyudaUBICACIONDELSUCESO);
        this.fromActivos.controls['mesaDeAyudaNUMEROINVENTARIOEQUIPO'].setValue(res.DATOS.mesaDeAyudaNUMEROINVENTARIOEQUIPO);
        this.fromActivos.controls['mesaDeAyudaDESCRIPCION'].setValue(res.DATOS.mesaDeAyudaDESCRIPCION);
        this.fromActivos.controls['mesaDeAyudaID'].setValue(res.DATOS.mesaDeAyudaID);
        this.fromActivos.controls['mesaDeAyudaNIVELPRIORIDAD'].setValue(res.DATOS.mesaDeAyudaNIVELPRIORIDAD);
      } else {
        this.SweetalertService.modal("error", res.MENSAJE);
      }
    });
  }

  enviarSolicitud(formValue) {
    this.BaseService.postJson("activos", "guardar", formValue).subscribe(res => {
      if (res.RESPUESTA == "EXITO") {
        this.SweetalertService.notificacion("success", res.MENSAJE);
        this.reiniciarInputs();
        /* this.Router.navigateByUrl('/mesaDeAyuda/misSolicitudes'); */
      } else {
        this.SweetalertService.modal("error", res.MENSAJE);
      }

    });
  }

  reiniciarInputs() {
    this.fromActivos.controls['activoSERIAL'].setValue("");
    this.fromActivos.controls['activoMARCA'].setValue("");
    this.fromActivos.controls['activoNUMEROPLACA'].setValue("");
    this.fromActivos.controls['tipoActivoID'].setValue("");
    this.fromActivos.controls['activoCategoriaID'].setValue("");
    this.fromActivos.controls['personaIDENTIFICACION'].setValue("");
  }

}
