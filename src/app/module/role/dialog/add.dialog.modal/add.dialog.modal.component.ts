import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.modal.component.html',
  styleUrls: ['./add.dialog.modal.component.css']
})

export class AddDialogModalComponent implements OnInit {

  addRoleEventEmitter: EventEmitter<any> = new EventEmitter();
  roleForm: FormGroup;
  loading = false;
  submitted = false;
  role: any = {};
  isViolationsError = false;
  violationsError = {
    libelle:''
  };


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private roleService: RoleService,
    private toaster: Toaster,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.roleForm = this.formBuilder.group({
      libelle: ['', Validators.required]
    });
  }
  get formControls() { return this.roleForm.controls; }

  onClose() {
    this.bsModalRef.hide();
  }
  addRoleSubmit(role: Role) {

    if (this.roleForm.valid) {
      this.loading = true;
      role.isActive = true;
      this.roleService.saveRole(role)
        .subscribe(
          data => {
            if (data.status === 201) {
              this.addRoleEventEmitter.emit(true);// important communication entre form et role
              this.bsModalRef.hide();
              this.toaster.open({ text: 'role créé avec succès', caption: 'Success', duration: 5000, type: 'success' });
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
            this.toaster.open({ text: `echec de la creation`, caption: 'Error', duration: 5000, type: 'danger' });
          }
        );
    } else {
      console.log("echec");
    }
  }

}
