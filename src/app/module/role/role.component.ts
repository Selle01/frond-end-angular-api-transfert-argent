import { EditDialogModalComponent } from './dialog/edit.dialog.modal/edit.dialog.modal.component';
import { DeleteDialogModalComponent } from './dialog/delete.dialog.modal/delete.dialog.modal.component';
import { AddDialogModalComponent } from './dialog/add.dialog.modal/add.dialog.modal.component';
import { RoleAdapter } from './../../models/Role';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { RoleService } from './services/role.service';
import { OnInit, Component } from "@angular/core";
import { Role } from 'src/app/models/Role';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['#', 'libellé', 'Edite', 'Delete'];
  idRole:number;
  roles: Role[];
  config: any;
  loadingTable = false;
  bsModalRef: BsModalRef;
  loadingDeleteItem:boolean=false;
  loadingEditItem:boolean=false;

  //dataChange: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private roleAdapter: RoleAdapter
  ) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0
    };
    this.router.navigate([], { queryParams: { page: "1" } });
  }

  ngOnInit() {
    this.loadingTable = true;
    this.getListRoles();
  }

  // get data(): Role[] {
  //   return this.dataChange.value;
  // }

  getListRoles() {
    this.route.queryParams.subscribe(
      params => {
        this.config.currentPage = params['page'] ? params['page'] : 1
        this.roleService.loadPage(params.page || 1)
          .pipe(
            map((data: any) => {
              this.loadingTable = false;
              this.roles = (data["hydra:member"]).map(item => this.roleAdapter.adapt(item));
              //this.dataChange.next(this.roles);
              //console.log(this.dataChange.value);
              this.config.totalItems = data['hydra:totalItems'];
            })
          ).subscribe()
      }
    );
  }

  pageChange(newPage: number) {
    this.loadingTable = true;
    this.router.navigate(['roles'], { queryParams: { page: newPage } });
  }

  startCreate() {
    this.bsModalRef = this.modalService.show(AddDialogModalComponent);
    this.bsModalRef.content.addRoleEventEmitter.subscribe(result => {
      if (result) {
        const role = this.roleAdapter.adapt(this.roleService.getDialogData());
        this.roles.push(role);
        this.config.totalItems += 1;
      }
    });
  }

  startDelete(id: number, libelle: string) {
    const initialState = {
      idRole: id,
      libelle: libelle,
    };
    this.bsModalRef = this.modalService.show(DeleteDialogModalComponent, { initialState });

    this.bsModalRef.content.loaderDeleteEventEmitter.subscribe(result => {
      if (result == 'loader item delete') {
        this.loadingDeleteItem=true;
        this.idRole=id;
      }
    });

    this.bsModalRef.content.deleteEventEmitter.subscribe(result => {
      if (result) {
        const foundIndex = this.roles.findIndex(x => x.id === id);
        this.roles.splice(foundIndex, 1);
        this.config.totalItems -= 1;
      }
    });

  }


  startEdit(id: number, libelle: string){
    const initialState = {
      idRole: id,
      libelle: libelle,
      title: 'Modifier'
    };
    this.bsModalRef = this.modalService.show(EditDialogModalComponent, { initialState });
    this.bsModalRef.content.loaderEditEventEmitter.subscribe(result => {
      if (result == 'loader item edit') {
        this.loadingEditItem=true;
        this.idRole=id;
      }
    });

    this.bsModalRef.content.editEventEmitter.subscribe(result => {
      if (result) {
        this.loadingEditItem=false;
        const foundIndex = this.roles.findIndex(x => x.id === id);
        const role = this.roleAdapter.adapt(this.roleService.getDialogData());
        this.roles[foundIndex]=role;
      }
    });

  }

  //premier methode
  // list(){
  //   this.roleService.list().pipe(map( (data: any) =>
  //     {
  //           this.roles  =  data["hydra:member"]  ;
  //           this.totalItems = data['hydra:totalItems'];
  //     }
  //     )).subscribe();
  //  }

  // recuperation list deuxieme methode avec la methode list():Observable<Role[]> sur roleService
  // ngOnInit() {
  //   // this.roleService.list().subscribe(
  //   //   response => {
  //   //     this.roles = response;
  //   //     //console.log(this.roles);
  //   //   },
  //   //   error => {
  //   //     console.log(error)
  //   //   }
  //   // );
  // }
}
