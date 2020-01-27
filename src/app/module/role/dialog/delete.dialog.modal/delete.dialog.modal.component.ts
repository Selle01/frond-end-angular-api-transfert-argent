import { RoleService } from './../../services/role.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { OnInit, Component, EventEmitter, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.modal.component.html',
  styleUrls: ['./delete.dialog.modal.component.css']
})

export class DeleteDialogModalComponent implements OnInit {
  idRole:number
  libelle: string;
  loadingBtnModalDelete :boolean=false;

  deleteEventEmitter: EventEmitter<any> = new EventEmitter();
  loaderDeleteEventEmitter : EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private roleService: RoleService,
    private toaster: Toaster,
  ) {}
  ngOnInit(){}

  confirm(): void {
    this.loadingBtnModalDelete = true;
    this.loaderDeleteEventEmitter.emit('loader item delete');
    this.roleService.deleteRole(this.idRole)
    .subscribe(
      data => {
        if (data.status === 204) {
          this.deleteEventEmitter.emit(true);
          this.bsModalRef.hide();
          this.toaster.open({ text: `role ${this.libelle} supprimé avec succès`, caption: 'success', duration: 5000, type: 'success' });
        }
      },
      (error) => {
        this.bsModalRef.hide();
        this.toaster.open({ text: `echec de la suppression`, caption: 'Error', duration: 5000, type: 'danger' });
      }
    );
  }
  decline(): void {
    this.bsModalRef.hide();
  }

}
