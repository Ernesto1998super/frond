import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { ChangePasswordModel } from '../../models/change-password.model';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  readonly URL = environment.urlGlobal;
  
 
  sendemail(email:string){
    return this.http.get(`${this.URL}/Users/forgot/${email}`).toPromise();
  }
  
  changepassword( token: string, password: ChangePasswordModel){
     return this.http.put(`${this.URL}/Users/reset-password/${token}`,password).toPromise();
  }

}
