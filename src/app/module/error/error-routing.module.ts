import { PageNotFoundComponent } from './page-not-found/page.not.found.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

  const routes: Routes = [
    // {
    //   path:'error',
    //   children:[
    //     { path: '404', component: PageNotFoundComponent},
    //     { path: 'access-denied', component: AccessDeniedComponent},
    //   ]
    // }
    { path: '404', component: PageNotFoundComponent},
    { path: 'access-denied', component: PageNotFoundComponent},
  ];
  @NgModule({
    declarations:[],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ErrortRoutingModule {}
