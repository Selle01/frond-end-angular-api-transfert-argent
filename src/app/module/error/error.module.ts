import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { PageNotFoundComponent } from './page-not-found/page.not.found.component';
import { ErrortRoutingModule } from './error-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
    declarations:[
      PageNotFoundComponent,
      AccessDeniedComponent
    ],
    imports:[
      CommonModule,
      ErrortRoutingModule,
    ]
})
export class ErrorModule {}
