import { Component, OnInit, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-svg-mapa-procesos',
  templateUrl: './svg-mapa-procesos.component.svg',
  styleUrls: ['./svg-mapa-procesos.component.css']
})
export class SvgMapaProcesosComponent implements OnInit {
  @Output() eventCarpetaDocumentoCODIGO = new EventEmitter();

  public titulosMapa={
    direccionamiento:"60DFE95F77073-DIRECCIONAMIENTO",
    planeacionEstrategica:"60DFE95F548BB-PLANEACION_ESTRATEGICA",
    gestionJuridica:"60DFE95F67D98-GESTION_JURIDICA",
    gestionFinanciera:"60DFE95F2352C-GESTION_FINANCIERA",
    telentoHumano:"60DFE95F6B4D9-TALENTO_HUMANO",
    recursosFisicos:"60DFE95E91FE3-RECURSOS_FISICOS",
    servicioSeguridad:"60DFE95E90499-SERVICIO_DE_SEGURIDAD",
    servicioAlimentos:"60DFE95F20EF9-SERVICIO_DE_ALIMENTOS",
    servicioGenerales:"60DFE95E89AF8-SERVICIOS_GENERALES",
    sistemasInformacionTICS:"60DFE95F36A35-SISTEMAS_DE_INFORMACION_Y_TIC",
    urgencias:"60DFE95F2C92A-URGENCIAS",
    hospitalizacion:"60DFE95E98F91-HOSPITALIZACION",
    grupoQuirurgico:"60DFE95F4E733-GRUPO_QUIRURGICO",
    apoyoDiagnostico:"60DFE95EC7295-APOYO_DIAGNOSTICO",
    consultaExterna:"60DFE95E8CF89-CONSULTA_EXTERNA",
    psiquiatria:"60DFE95F30B19-PSIQUIATRIA",
    atencionUsuario:"60DFE95F1ADCD-ATENCION_AL_USUARIO",
    programaEstrategicos:"60DFE95F1C7FF-PROGRAMAS_ESTRATEGICOS",
    docenciaInvestigacion:"60DFE95F42852-DOCENCIA_E_INVESTIGACION",
    epidemiologia:"60DFE95E89C9F-EPIDEMIOLOGIA",
    controlInterno:"60DFE95F20C1C-CONTROL_INTERNO",
    gestionCalidad:"60DFE95E5B1C7-GESTION_DE_LA_CALIDAD",
    controlInternoDisciplinario:"60DFE95F36827-CONTROL_INTERNO_DISCIPLINARIO",
    auditoria:"60DFE95F42A85-AUDITORIA"
  };
  constructor() { }

  ngOnInit(): void {
  }

  buscarCarpeta(carpetaDocumentoCODIGO){
    this.eventCarpetaDocumentoCODIGO.emit(carpetaDocumentoCODIGO);
  }
}
