import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'app/servicios/base.service';
import { FechaService } from 'app/servicios/fecha.service';
import { LocalStorageService } from 'app/servicios/local-storage.service';
import { SweetalertService } from 'app/servicios/sweetalert.service';
import { UsuarioLogiadoService } from 'app/servicios/usuario-logiado.service';

@Component({
  selector: 'app-from-entrega',
  templateUrl: './from-entrega.component.html',
  styleUrls: ['./from-entrega.component.css']
})
export class FromEntregaComponent implements OnInit {
  tituloaccion="Guardar";
  formActividadMedica;
  formPaciente;

  pacientes = [];

  tiposIdentificaciones = [];
  servicios = [];
  especialidadesMedicas = [];
  eps = [];
  colaboradoresActividadesMedicas = [];
  cargando=true;
  servicioOBSTETRICIA=false;
  OBSTETRICIA_ID=8;
  EDITAR=false;

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
      let fechaActual=this.FechaService.Actual("YYYY-MM-DD").toString();
      this.formActividadMedica=this.fb.group({
        actividadMedicaColaboradorASIGNACION: new FormControl('', Validators.compose([Validators.required])),
        servicioGlobalID: new FormControl('', Validators.compose([Validators.required])),
        actividadMedicaColaboradorID:  new FormControl('')
      });

      this.formPaciente=this.fb.group({
        tipoIdentificacionID: new FormControl('', Validators.compose([Validators.required])),
        personaIDENTIFICACION: new FormControl('', Validators.compose([Validators.required])),
        personaRAZONSOCIAL: new FormControl('', Validators.compose([Validators.required])),
        especialidadMedicaID: new FormControl('', Validators.compose([Validators.required])),
        actividadMedicaPacienteCAMA: new FormControl(''),
        personaEDAD: new FormControl(''),
        actividadMedicaPacienteINGRESO: new FormControl(fechaActual),
        actividadMedicaPacientePERFILINFECCIOSO: new FormControl(''),
        actividadMedicaPacientePERFILTOXEMICO: new FormControl(''),
        actividadMedicaPacienteIMAGENES: new FormControl(''),
        actividadMedicaPacienteALERGIA:  new FormControl(''),
        actividadMedicaPacienteMEDICAMENTO:  new FormControl(''),
        actividadMedicaPacienteNOTA:  new FormControl(''),
        actividadMedicaPacientePARACLINICO: new FormControl(''),
        actividadMedicaPacienteDIAGNOSTICO: new FormControl('', Validators.compose([Validators.required])),
        servicioID: new FormControl(''),
        epsID: new FormControl('', Validators.compose([Validators.required]))
      });
    }

  ngOnInit(): void {
    this.cargarDatosEntrada();
    let id=this.ActivatedRoute.snapshot.paramMap.get("id");
    let copiaDe=this.ActivatedRoute.snapshot.paramMap.get("copiaDe");
    if(id){
      this.cargarDatosDeActividadMedica(id);
      if (this.UsuarioLogiadoService.adminUsuario()) {
        this.EDITAR=true;
      }
    }else{
      if(copiaDe){
        this.cargarDatosDeActividadMedicaPorCopia(copiaDe);
      }
      this.EDITAR=true;
    }
  }

  cargarDatosDeActividadMedica(id){
    this.BaseService.postJson('ActividadesMedicas','buscarTodosPacientesPorActividadMedicaID',{actividadMedicaColaboradorID:id}).subscribe(res=>{
      console.log(res);
      if(res.RESPUESTA=="EXITO"){
        this.formActividadMedica.controls['actividadMedicaColaboradorASIGNACION'].setValue(res.DATOS.ActividadMedica.actividadMedicaColaboradorASIGNACION);
        this.formActividadMedica.controls['actividadMedicaColaboradorID'].setValue(res.DATOS.ActividadMedica.actividadMedicaColaboradorID);
        this.pacientes = res.DATOS.Pacientes;
        this.formActividadMedica.controls['servicioGlobalID'].setValue(this.pacientes[0].servicioID);
        if(this.OBSTETRICIA_ID==this.pacientes[0].servicioID){
          this.servicioOBSTETRICIA=true;
        }
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
  });
  }

  cargarDatosDeActividadMedicaPorCopia(id){
    this.BaseService.postJson('ActividadesMedicas','buscarTodosPacientesPorActividadMedicaID',{actividadMedicaColaboradorID:id}).subscribe(res=>{
      console.log(res);
      if(res.RESPUESTA=="EXITO"){
        this.pacientes = res.DATOS.Pacientes;
        this.formActividadMedica.controls['servicioGlobalID'].setValue(this.pacientes[0].servicioID);
        if(this.OBSTETRICIA_ID==this.pacientes[0].servicioID){
          this.servicioOBSTETRICIA=true;
        }
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
  });
  }

  cargarDatosEntrada(){
    this.BaseService.postJson('ActividadesMedicas','cargaDatosIniciales').subscribe(res=>{
      if(res.RESPUESTA=="EXITO"){
        this.tiposIdentificaciones = res.DATOS.TiposIdentificaciones;
        this.servicios = res.DATOS.Servicios;
        this.especialidadesMedicas = res.DATOS.EspecialidadesMedicas;
        this.eps = res.DATOS.Eps;
        this.colaboradoresActividadesMedicas = res.DATOS.ColaboradoresActividadesMedicas;
      }else{
        this.SweetalertService.modal("error",res.MENSAJE);
      }
      this.cargando=false;
    });
  }

  insertarPaciente(paciente){
    let filterPaciente = this.pacientes.filter(pac=> pac.personaIDENTIFICACION == paciente.personaIDENTIFICACION);
    if (filterPaciente.length == 0 ) {
      this.pacientes.push(paciente);
      this.limpiarFormularioPaciente();
    }else{
      this.SweetalertService.modal("warning", "El paciente ingresado ya se encuentra en lista.");
    }
  }

  eliminarPaciente(index){
    this.pacientes.splice(index, 1);
  }

  enviarSolicitud(value){
    let data = value;
    data.pacientes = this.pacientes;

    this.SweetalertService.confirmacion("info","Esta seguro de guardar esta información?","").then(res=>{
      if(res){
        this.BaseService.postJson('ActividadesMedicas','guardar',data).subscribe(res=>{
          if(res.RESPUESTA=="EXITO"){
            this.SweetalertService.notificacion("success",res.MENSAJE);
            this.Router.navigateByUrl("/");
          }else{
            this.SweetalertService.modal("error",res.MENSAJE);
          }
        });
      }
    });
  }

  limpiarFormularioPaciente(){
    this.formPaciente.controls['tipoIdentificacionID'].setValue('');
    this.formPaciente.controls['personaIDENTIFICACION'].setValue('');
    this.formPaciente.controls['personaRAZONSOCIAL'].setValue('');
    this.formPaciente.controls['especialidadMedicaID'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteALERGIA'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteMEDICAMENTO'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteNOTA'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteDIAGNOSTICO'].setValue('');
    this.formPaciente.controls['actividadMedicaPacientePERFILTOXEMICO'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteIMAGENES'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteALERGIA'].setValue('');
    this.formPaciente.controls['servicioID'].setValue('');
    this.formPaciente.controls['epsID'].setValue('');
    this.formPaciente.controls['actividadMedicaPacientePARACLINICO'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteCAMA'].setValue('');
    this.formPaciente.controls['actividadMedicaPacienteINGRESO'].setValue('');
    this.formPaciente.controls['personaEDAD'].setValue('');
  }

  buscarPaciente(index){
    let paciente = this.pacientes[index];
    this.formPaciente.controls['tipoIdentificacionID'].setValue(paciente.tipoIdentificacionID);
    this.formPaciente.controls['personaIDENTIFICACION'].setValue(paciente.personaIDENTIFICACION);
    this.formPaciente.controls['personaRAZONSOCIAL'].setValue(paciente.personaRAZONSOCIAL);
    this.formPaciente.controls['especialidadMedicaID'].setValue(paciente.especialidadMedicaID);
    this.formPaciente.controls['actividadMedicaPacienteALERGIA'].setValue(paciente.actividadMedicaPacienteALERGIA);
    this.formPaciente.controls['actividadMedicaPacienteMEDICAMENTO'].setValue(paciente.actividadMedicaPacienteMEDICAMENTO);
    this.formPaciente.controls['actividadMedicaPacienteNOTA'].setValue(paciente.actividadMedicaPacienteNOTA);
    this.formPaciente.controls['actividadMedicaPacienteDIAGNOSTICO'].setValue(paciente.actividadMedicaPacienteDIAGNOSTICO);
    this.formPaciente.controls['servicioID'].setValue(paciente.servicioID);
    this.formPaciente.controls['epsID'].setValue(paciente.epsID);
    this.formPaciente.controls['actividadMedicaPacientePARACLINICO'].setValue(paciente.actividadMedicaPacientePARACLINICO);
    this.formPaciente.controls['actividadMedicaPacienteCAMA'].setValue(paciente.actividadMedicaPacienteCAMA);
    this.formPaciente.controls['actividadMedicaPacienteINGRESO'].setValue(paciente.actividadMedicaPacienteINGRESO);
    this.formPaciente.controls['personaEDAD'].setValue(this.FechaService.formatiar(paciente.personaFCHNACIMIENTO,"YYYY-MM-DD"));
    this.formPaciente.controls['actividadMedicaPacientePERFILTOXEMICO'].setValue(paciente.actividadMedicaPacientePERFILTOXEMICO);
    this.formPaciente.controls['actividadMedicaPacienteIMAGENES'].setValue(paciente.actividadMedicaPacienteIMAGENES);
    this.formPaciente.controls['actividadMedicaPacienteALERGIA'].setValue(paciente.actividadMedicaPacienteALERGIA);
  }

  changeServicios(value){
    if (value==this.OBSTETRICIA_ID) {
      this.servicioOBSTETRICIA=true;
    }else{
      this.servicioOBSTETRICIA=false;
    }
  }
}
