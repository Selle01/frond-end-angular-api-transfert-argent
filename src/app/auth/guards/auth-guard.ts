import { AuthService } from './../services/auth.service';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }
	from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {


  private allowedRoles:string[];
  private userRoles:string[];

  constructor(private authService: AuthService, private router: Router) { }


	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let url: string = state.url;
    this.allowedRoles = route.data["roles"];
    this.userRoles =JSON.parse(this.authService.getRoles());

    return this.checkLogin(url);
    return this.checkPermissions();
	}

	checkLogin(url: string): boolean {
		if (this.authService.isLoggedIn()) {
      return true;
    }
		this.authService.redirectUrl = url;
		this.router.navigate(['/login']);
		return false;
  }

 checkPermissions():boolean{

  const allowed:boolean = this.userRoles.filter(
    role=>this.allowedRoles.includes(role)
    ).length > 0;

    if (!allowed) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
 }
}
