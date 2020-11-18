import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.auth.token_type} ${this.auth.access_token}`
      }
    });

    return next.handle(request).do(event => { }, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        this.router.navigate(['/login']);
      }
    });
  }
}
