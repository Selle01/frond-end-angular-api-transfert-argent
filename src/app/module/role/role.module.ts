import { DeleteDialogModalComponent } from './dialog/delete.dialog.modal/delete.dialog.modal.component';
import { EditDialogModalComponent } from './dialog/edit.dialog.modal/edit.dialog.modal.component';
import { AddDialogModalComponent } from './dialog/add.dialog.modal/add.dialog.modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoleService } from './services/role.service';
import { RoleRoutingModule } from './role-routing.module';
import { CommonModule } from '@angular/common';
import {  NgModule } from "@angular/core";
import { RoleComponent } from './role.component';
import { ContentLoaderModule } from '@netbasal/content-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ContentLoaderModule } from '@ngneat/content-loader';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [RoleComponent,AddDialogModalComponent,EditDialogModalComponent,DeleteDialogModalComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ContentLoaderModule,
    ModalModule.forRoot(),
  ],
  exports:[RoleRoutingModule],
  providers:[
    RoleService,
  ],
  entryComponents:[AddDialogModalComponent,EditDialogModalComponent,DeleteDialogModalComponent]
})
export class RoleModule {}
