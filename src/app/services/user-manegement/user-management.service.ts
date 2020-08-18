import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ModalityModel } from '../../models/modality.model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  readonly URL = environment.urlGlobal;


  constructor(private http: HttpClient) { }


  getUsuarios(){
    return this.http.get(`${this.URL}/Users/obtener`).toPromise();
  }

  getUsuariosByid(idUsers: string){
    console.log(`${this.URL}/Users/obtener/${idUsers}`);
    return this.http.get(`${this.URL}/Users/obtener/${idUsers}`).toPromise();
  }

  putUsuarios(idUsers: string, usuario: User){
  
    return this.http.put(`${this.URL}/Users/actualizar/${usuario._id}`, usuario).toPromise();
  }

  
  putUsuarioEspecialidad(idUsers: string, especilidad: any[]){
    console.log(especilidad);
    especilidad.forEach(element =>{
      let aJsnEspecialidad = {
        "aJsnEspecialidad": especilidad
        
      }
    return this.http.put(`${this.URL}/Users/asignar-especialidad/${idUsers}`, aJsnEspecialidad).toPromise();
    });
   
  }
  postUsuarios(idUsers: User ){
    return this.http.post(`${this.URL}/Users/asignar-especialidad`, idUsers).toPromise();
  }

  deleteModalidades(idGes: string){
    return this.http.delete(`${this.URL}/modalidad/eliminar/${idGes}`).toPromise();
  }



}