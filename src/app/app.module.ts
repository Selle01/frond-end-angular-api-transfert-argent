import { ErrorModule } from './module/error/error.module';
import { RoleModule } from './module/role/role.module';
import { DashboardModule } from './module/dashboard/dashboard.module';
import { ToastComponent } from './components/toast.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorInterceptor } from './helpers/http/error.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DefaultModule } from './layout/default/default.module';
import { TokenInterceptor } from './helpers/http/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';

 import { TOAST_NOTIFICATIONS_CONFIG, ToastNotificationsModule, Toast, ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    /** modules indispensables */
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    NgxPaginationModule,//pagination
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ToastNotificationsModule,
    /** mes modules */
    AuthModule,
    DefaultModule,
    DashboardModule,
    RoleModule,
    ErrorModule
  ],
  exports:[],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: TOAST_NOTIFICATIONS_CONFIG, useValue: {component: ToastComponent}},
  ],
  entryComponents:[ToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
