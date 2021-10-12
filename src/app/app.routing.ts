import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { ValidadorDeColaboradorComponent } from './pagesExternas/validador-de-colaborador/validador-de-colaborador.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      canActivate: [AuthGuard],
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  }]},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'validador-colaborador/:identificacion',
    component: ValidadorDeColaboradorComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
