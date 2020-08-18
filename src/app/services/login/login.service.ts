import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  selectedLogin: Login;
  logins: Login[];
  readonly URL_API = 'http://localhost:3000/api/Users/login';

  constructor(private http: HttpClient, private router: Router) { 
    this.selectedLogin = new Login();
  }

  postLogin(user){
    return this.http.post(this.URL_API, user);
  }

  loggedIn(){
    if (localStorage.getItem('token')) {
      return true
    }else{
      return false
    }
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }

}
