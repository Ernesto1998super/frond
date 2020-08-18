import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req, next) {
    const tokeized = req.clone({
      setHeader: {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });
    return next.handle(tokeized);
  }
}
