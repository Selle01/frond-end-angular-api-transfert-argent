import { Injectable } from '@angular/core';
import { Adapter } from './adapter/adapter';

export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public firstName:string,
    public lastName:string,
    public address:string,
    public phone:number,
    public roles:string[],
    public image:string,
    public createdAt:string,
    public updatedAt:string,
    public isActive:Boolean,
  ) {
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  adapt(item: any): User {
    return new User(
      item.id,
      item.username,
      item.email,
      item.firstName,
      item.lastName,
      item.address,
      item.phone,
      item.roles,
      item.image,
      item.createdAt,
      item.updatedAt,
      item.isActive
    );
  }
}
