
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
@NgModule({
  declarations: [
    DefaultComponent,
    //DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    //AngularToastifyModule
    ToastNotificationsModule,
  ],
  providers: [
    //ToastService
  ]
})
export class DefaultModule { }

