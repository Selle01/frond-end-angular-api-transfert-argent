import { API_URL } from './../../app.constants';
import { map, tap, catchError, mapTo } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLES = 'ROLES';
  redirectUrl: string;

  constructor(private http:HttpClient){}

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${API_URL}/login`, user)
      .pipe(
        tap(data => {
          const decoded = jwt_decode(data.token);
          this.storeLoginUser(decoded,data.token);
          return data;
        }),
        // mapTo(true),
        // catchError(error => {
        //   return of(error);
        // })
      );
  }

  logout(): Observable<void> {
    return Observable.create(
      (observer) => {
        this.doLogoutUser();
        observer.next();
      }
    )
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRoles() {
    return localStorage.getItem(this.ROLES);
  }

  private storeLoginUser(user,token) {
    localStorage.setItem(this.ROLES, JSON.stringify(user.roles));
    localStorage.setItem(this.JWT_TOKEN, token);
    localStorage.setItem("userName", user.username);
    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);
    localStorage.setItem("email", user.email);
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

}
