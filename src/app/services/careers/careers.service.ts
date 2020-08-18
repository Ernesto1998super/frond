import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CareerModel } from 'src/app/models/career';

 
@Injectable({
  providedIn: 'root'
})
export class CareersService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  getCareers(){
    return this.http.get(`${this.URL}/carreras/obtener`).toPromise();
  }

  getCarrerByid(idCarrera: string){
    return this.http.get(`${this.URL}/carreras/obtener/${idCarrera}`).toPromise();
  }

  postCarrer(career: CareerModel){
    return this.http.post(`${this.URL}/carreras/registrar`, career).toPromise();
  }

  putCareer(idCareer: string, career: CareerModel){
    return this.http.put(`${this.URL}/carreras/actualizar/${idCareer}`, career).toPromise();
  }

}