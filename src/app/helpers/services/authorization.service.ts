import { AuthService } from './../../auth/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private authService: AuthService){}

  isAuthorized(allowedRoles: string[]): boolean {
    //console.log(allowedRoles);
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get token from local storage or state management
    const token = this.authService.getJwtToken();
    //const token = localStorage.getItem('JWT_TOKEN');
    const userRoles = JSON.parse(this.authService.getRoles());

    //console.log(userRoles);

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!token) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return userRoles.filter(role=>allowedRoles.includes(role)).length > 0;
  }
}
