import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  userLogin=localStorage;
  roles = JSON.parse(localStorage.ROLES);

  constructor( private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout().subscribe(
      () => this.router.navigate(['/login'])
    );
  }

}
