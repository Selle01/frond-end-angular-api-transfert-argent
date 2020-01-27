import { AuthGuard } from './../guards/auth-guard';
import { AuthService } from './../services/auth.service';

import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

@NgModule({
    imports:[
      RouterModule.forChild([
        {
          path:'login',
          component: LoginComponent,
          //canActivate: [AuthGuard]
        }
      ])
    ],exports:[
      RouterModule
    ],
    providers:[
      AuthService
    ]
})

export class LoginRoutingModule {}
