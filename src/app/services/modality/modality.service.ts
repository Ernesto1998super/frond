import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ModalityModel } from '../../models/modality.model';


@Injectable({
  providedIn: 'root'
})
export class ModalityService {

  readonly URL = environment.urlGlobal;


  constructor(private http: HttpClient) { }


  getModalidades(){
    return this.http.get(`${this.URL}/modalidad/obtener`).toPromise();
  }

  getModalidadesByid(idModalidades: string){
    return this.http.get(`${this.URL}/modalidad/obtener/${idModalidades}`).toPromise();
  }

  postModalidades(modality: ModalityModel ){
    return this.http.post(`${this.URL}/modalidad/registrar`, modality).toPromise();
  }

  putModalidades(idMod: string, modality: ModalityModel){
    return this.http.put(`${this.URL}/modalidad/actualizar/${idMod}`, modality).toPromise();
  }


  deleteModalidades(idMod: string){
    return this.http.delete(`${this.URL}/modalidad/eliminar/${idMod}`).toPromise();
  }



}