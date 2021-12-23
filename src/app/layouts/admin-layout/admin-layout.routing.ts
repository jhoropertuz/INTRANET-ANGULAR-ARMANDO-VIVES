import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { MapaProcesosComponent } from 'app/pages/mapa-procesos/mapa-procesos.component';
import { UserFormComponent } from 'app/pages/user/user-form/user-form.component';
import { UserPermisosComponent } from 'app/pages/user/user-permisos/user-permisos.component';

import { DocumentosComponent } from 'app/pages/documentos/documentos.component';
import { EquiposFisicosComponent } from 'app/pages/equipos-fisicos/equipos-fisicos.component';
import { DocumentosFormComponent } from 'app/pages/documentos/documentos-form/documentos-form.component';
import { DocumentosVerComponent } from 'app/pages/documentos/documentos-ver/documentos-ver.component';
import { GuiasPracticasClinicasComponent } from 'app/pages/guias-practicas-clinicas/guias-practicas-clinicas.component';
import { MesaDeAyudaComponent } from 'app/pages/mesa-de-ayuda/mesa-de-ayuda.component';
import { MisSolicitudesComponent } from 'app/pages/mesa-de-ayuda/mis-solicitudes/mis-solicitudes.component';
import { SolicitudesComponent } from 'app/pages/mesa-de-ayuda/solicitudes/solicitudes.component';
import { SolicitudesEnCursoComponent } from 'app/pages/mesa-de-ayuda/solicitudes-en-curso/solicitudes-en-curso.component';
import { SolicitudesPendientesComponent } from 'app/pages/mesa-de-ayuda/solicitudes-pendientes/solicitudes-pendientes.component';
import { GestionarSolicitudesComponent } from 'app/pages/mesa-de-ayuda/gestionar-solicitudes/gestionar-solicitudes.component';
import { VerSolicitudComponent } from 'app/pages/mesa-de-ayuda/ver-solicitud/ver-solicitud.component';
import { FromEntregaComponent } from 'app/pages/ActividadesMedicas/from-entrega/from-entrega.component';
import { EntregaComponent } from 'app/pages/ActividadesMedicas/entrega/entrega.component';
import { RecibidosComponent } from 'app/pages/ActividadesMedicas/recibidos/recibidos.component';
import { VerComponent } from 'app/pages/ActividadesMedicas/ver/ver.component';
import { NuevaCarpetaComponent } from 'app/pages/documentos/nueva-carpeta/nueva-carpeta.component';
import { ImagenesCorportivasComponent } from 'app/pages/documentos/imagenes-corportivas/imagenes-corportivas.component';
import { HorariosMedicoComponent } from 'app/pages/documentos/horarios-medico/horarios-medico.component';
import { EstadisticasComponent } from 'app/pages/mesa-de-ayuda/estadisticas/estadisticas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user', children:[
      {
        path:'',
        component:UserComponent
      },
      {
        path:'editar/:id',
        component: UserFormComponent
      },
      {
        path:'perfil/:miPerfil',
        component: UserFormComponent
      },
      {
        path:'nuevo',
        component: UserFormComponent
      },
      {
        path:'permisos/:id',
        component: UserPermisosComponent
      }
    ] },
    { path:'documentos',children:[
      {
        path:'',
        component: DocumentosComponent
      },
      {
        path:'editar/:id',
        component: DocumentosFormComponent
      },
      {
        path:'nuevo',
        component: DocumentosFormComponent
      },
      {
        path:'ver/:id',
        component: DocumentosVerComponent
      },
      {
        path:"nueva-carpeta",
        component:  NuevaCarpetaComponent
      },
      {
        path:"imagenCorporativa",
        component:  ImagenesCorportivasComponent
      },
      {
        path:"horariosmedicos",
        component:  HorariosMedicoComponent
      }
    ]},
    { path:'equipos-fisicos',children:[
      {
        path:'',
        component: EquiposFisicosComponent
      },


    ]},
    { path:'actividadesMedicas',children:[
      {
        path:'formEntrega',
        component: FromEntregaComponent
      },
      {
        path:'Entregas',
        component: EntregaComponent
      },
      {
        path:'Recibidos',
        component: RecibidosComponent
      }
      ,
      {
        path:'editar/:id',
        component: FromEntregaComponent
      },
      {
        path:'ver/:id',
        component: VerComponent
      },
      {
        path:'frmCopia/:copiaDe',
        component: FromEntregaComponent
      }
    ]},
    { path:'mesaDeAyuda',children:[
      {
        path:'form',
        component: MesaDeAyudaComponent
      },
      {
        path:'estadisticas',
        component: EstadisticasComponent
      },
      {
        path:'solicitudes',
        component: SolicitudesComponent
      },
      {
        path:'solicitudesPendientes',
        component: SolicitudesPendientesComponent
      },
      {
        path:'solicitudesEnCurso',
        component: SolicitudesEnCursoComponent
      },
      {
        path:'ver/:id',
        component: VerSolicitudComponent
      },
      {
        path:'editar/:id',
        component: MesaDeAyudaComponent
      },
      {
        path:'gestionarSolicitud/:id',
        component: GestionarSolicitudesComponent
      },
      {
        path:'misSolicitudes',
        component: MisSolicitudesComponent
      }
    ]},
    {path:'guias-practicas-clinicas',component: GuiasPracticasClinicasComponent},
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'mapa-procesos',  component: MapaProcesosComponent }
];
