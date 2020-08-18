import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.prod';




@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  selectedUser: User;
  users: User[];
  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { 
    this.selectedUser = new User();
  }

  postUser(User: User){
    return this.http.post(`${this.URL}/Users/registro`, User).toPromise();
  }

}
