import { RoleService } from '../../services/role.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.modal.component.html',
  styleUrls: ['./edit.dialog.modal.component.css']
})

export class EditDialogModalComponent implements OnInit {

  idRole: number;// variable provenant de initialState dans RoleComponent ,juste les declare pour  qu'il soit vue dans edit.html
  libelle: string;// variable provenant de initialState RoleComponent
  roleForm: FormGroup;

  role: any = {};
  loading = false;
  submitted = false;

  isViolationsError = false;
  violationsError = {
    libelle: ''
  };

  loaderEditEventEmitter: EventEmitter<any> = new EventEmitter();
  editEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private roleService: RoleService,
    private toaster: Toaster,
  ) {

  }

  ngOnInit() {
    this.initRole();
    this.initForm();
  }

  initRole(){
    this.role.id = this.idRole;
    this.role.libelle = this.libelle;
  }

  initForm(): void {
    this.roleForm = this.formBuilder.group({
      libelle: [this.libelle, Validators.required]
    });
  }
  get formControls() { return this.roleForm.controls; }

  onClose() {
    this.bsModalRef.hide();
  }

  editRoleSubmit(role: Role) {

    this.loaderEditEventEmitter.emit('loader item edit');
    if (this.roleForm.valid) {
      this.loading = true;
      this.roleService.editeRole(role)
        .subscribe(
          data => {
            if (data.status === 200) {
              this.editEventEmitter.emit(true);
              this.bsModalRef.hide();
              this.toaster.open({ text: 'role modifié avec succès', caption: 'Success', duration: 5000, type: 'success' });
            }
          },
          (error) => {
            if (error.status === 400) {
              this.loading = false;
              this.isViolationsError = true;
              const violations = error.error.violations;
              violations.forEach(({ propertyPath, message }) => {
                this.violationsError[propertyPath] = message;
              });
              this.violationsError = JSON.parse(JSON.stringify(this.violationsError));
            }
            this.bsModalRef.hide();
            this.toaster.open({ text: `echec de la modification`, caption: 'Error', duration: 5000, type: 'danger' });
          }
        );
    } else {
      console.log("echec");
    }
  }

}
