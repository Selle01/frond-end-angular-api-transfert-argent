import { RoleComponent } from './module/role/role.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { AuthorizationGuard } from './helpers/guards/authorization.guard';
import { AuthGuard } from './auth/guards/auth-guard';
import { DefaultComponent } from './layout/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthorizationGuard],
    component: DefaultComponent,
    children: [
      {
         path: '',
         component: DashboardComponent,
         data: {
          allowedRoles: ['ADMIN_SYSTEM','ADMIN','CAISSIER']
        }
      },
      {
        path: 'roles',
        component: RoleComponent,
        data: {
          allowedRoles: ['ADMIN_SYSTEM']
        },

      },
    ]
  },
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
