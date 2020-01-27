import { API_URL } from './../../../app.constants';
import { RoleAdapter, Role } from './../../../models/Role';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {


  dialogData: any;

  constructor(
    private http: HttpClient,
    private adapter: RoleAdapter
  ) { }


  getDialogData() {
    return this.dialogData;
  }

  list() {
    return this.http.get(`${API_URL}/roles`).pipe(
      //tap(data =>data),
      map(data => data)
    );
  }

  loadPage(page) {
    return this.http.get<any>(`${API_URL}/roles?page=${page}`)
      .pipe(map(data => data));
  }

  addRole(role: Role): void {
    this.dialogData = role;
  }

  saveRole(role: Role) {
    return this.http.post(`${API_URL}/roles`, role, { observe: 'response' })
      .pipe(
        tap(data=>{
          this.dialogData = data['body'];
        }),
        map(data => data)
      );
  }

  editeRole(role: Role){
    return this.http.put(`${API_URL}/roles/${role.id}`, role, { observe: 'response' })
    .pipe(
      tap(data=>{
        this.dialogData = data['body'];
      }),
      map(data => data)
    );
  }

  deleteRole(id:number){
    return this.http.delete(`${API_URL}/roles/${id}`, { observe: 'response' })
    .pipe(
         map(data => data)
    );
  }

  // list():Observable<Role[]> {
  //   return this.http.get(`${API_URL}/roles`).pipe(
  //     map(data => data['hydra:member']),
  //     map((data: any[]) => data.map(item => this.adapter.adapt(item))),
  //   );
  // }
}
