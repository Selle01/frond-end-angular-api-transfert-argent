import { Injectable } from '@angular/core';
import { Adapter } from './adapter/adapter';

export class Role {
  constructor(
    public id: number,
    public libelle: string,
    public isActive: boolean,
  ) {

  }

}


@Injectable({
  providedIn: 'root'
})
export class RoleAdapter implements Adapter<Role> {

  adapt(item: any): Role {
    return new Role(
      item.id,
      item.libelle,
      item.isActive
    );
  }
}
