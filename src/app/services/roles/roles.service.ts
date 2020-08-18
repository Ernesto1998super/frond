import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get(`${this.URL}/Roles/obtener`).toPromise();
  }

  getRolByid(idRol: string){
    return this.http.get(`${this.URL}/Roles/obtener/${idRol}`).toPromise();
  }
}
