import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapaProcesosComponent } from 'app/pages/mapa-procesos/mapa-procesos.component';
import { CargandoSonarModule } from 'app/shared/cargando-sonar/cargando-sonar.module';
import { SvgMapaProcesosModule } from 'app/shared/svg-mapa-procesos/svg-mapa-procesos.module';
import { ListaDocumentosModule } from 'app/shared/lista-documentos/lista-documentos.module';
import { UserFormComponent } from 'app/pages/user/user-form/user-form.component';
import { TablaBasicaModule } from 'app/shared/tablas/tabla-basica/tabla-basica.module';
import { UserPermisosComponent } from 'app/pages/user/user-permisos/user-permisos.component';
import { SwiperModule } from 'swiper/angular';
import { DocumentosComponent } from 'app/pages/documentos/documentos.component';
import { TablaDatatableModule } from 'app/shared/tablas/tabla-datatable/tabla-datatable.module';
import { EquiposFisicosComponent } from 'app/pages/equipos-fisicos/equipos-fisicos.component';
import { DocumentosFormComponent } from 'app/pages/documentos/documentos-form/documentos-form.component';
import { DocumentosVerComponent } from 'app/pages/documentos/documentos-ver/documentos-ver.component';
import { NuevaCarpetaComponent } from 'app/pages/documentos/nueva-carpeta/nueva-carpeta.component';

import { GuiasPracticasClinicasComponent } from 'app/pages/guias-practicas-clinicas/guias-practicas-clinicas.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MesaDeAyudaComponent } from 'app/pages/mesa-de-ayuda/mesa-de-ayuda.component';
import { MisSolicitudesComponent } from 'app/pages/mesa-de-ayuda/mis-solicitudes/mis-solicitudes.component';
import { SolicitudesComponent } from 'app/pages/mesa-de-ayuda/solicitudes/solicitudes.component';
import { SolicitudesPendientesComponent } from 'app/pages/mesa-de-ayuda/solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesEnCursoComponent } from 'app/pages/mesa-de-ayuda/solicitudes-en-curso/solicitudes-en-curso.component';
import { GestionarSolicitudesComponent } from 'app/pages/mesa-de-ayuda/gestionar-solicitudes/gestionar-solicitudes.component';
import { VerSolicitudComponent } from 'app/pages/mesa-de-ayuda/ver-solicitud/ver-solicitud.component';
import { FromEntregaComponent } from 'app/pages/ActividadesMedicas/from-entrega/from-entrega.component';
import { EntregaComponent } from 'app/pages/ActividadesMedicas/entrega/entrega.component';
import { RecibidosComponent } from 'app/pages/ActividadesMedicas/recibidos/recibidos.component';
import { VerComponent } from 'app/pages/ActividadesMedicas/ver/ver.component';
import { ImagenesCorportivasComponent } from 'app/pages/documentos/imagenes-corportivas/imagenes-corportivas.component';
import { HorariosMedicoComponent } from 'app/pages/documentos/horarios-medico/horarios-medico.component';
import { EstadisticasComponent } from 'app/pages/mesa-de-ayuda/estadisticas/estadisticas.component';
import { NuevoActivoComponent } from 'app/pages/activos/nuevo-activo/nuevo-activo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    CargandoSonarModule,
    SvgMapaProcesosModule,
    ListaDocumentosModule,
    ReactiveFormsModule,
    TablaBasicaModule,
    FormsModule,
    SwiperModule,
    TablaDatatableModule,
    NgxDocViewerModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    MapaProcesosComponent,
    UserFormComponent,
    UserPermisosComponent,
    DocumentosComponent,
    EquiposFisicosComponent,
    DocumentosFormComponent,
    DocumentosVerComponent,
    GuiasPracticasClinicasComponent,
    MesaDeAyudaComponent,
    MisSolicitudesComponent,
    SolicitudesComponent,
    SolicitudesPendientesComponent,
    SolicitudesEnCursoComponent,
    GestionarSolicitudesComponent,
    VerSolicitudComponent,
    FromEntregaComponent,
    EntregaComponent,
    RecibidosComponent,
    VerComponent,
    NuevaCarpetaComponent,
    ImagenesCorportivasComponent,
    HorariosMedicoComponent,
    EstadisticasComponent,
    NuevoActivoComponent
  ]
})

export class AdminLayoutModule {}
