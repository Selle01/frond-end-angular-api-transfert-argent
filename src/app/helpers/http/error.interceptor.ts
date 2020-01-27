import { Router } from '@angular/router';
import { AuthService } from './../../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService,private router: Router,) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            if ([401, 403].indexOf(error.status) !== -1) {
                //this.authService.logout();
                //location.reload(true);
            }
            if (error instanceof HttpErrorResponse && error.status === 401){
              localStorage.clear();
              localStorage.setItem("isTokenExpired","ok");
              this.router.navigate(["login"]);
            }
            //return throwError(error.error.message || error.statusText);
            return throwError(error);
        }));
    }
}
