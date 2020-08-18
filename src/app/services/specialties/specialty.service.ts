import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CareersService } from '../careers/careers.service';
import { SpecialtyModel } from '../../models/specialty';



@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }


  getSpecialties(idCareer: string){
    return this.http.get(`${this.URL}/especialidad/obtener/${idCareer}`).toPromise();
  }

  postSpecialty(idCareer: string, specialty: SpecialtyModel){
    return this.http.post(`${this.URL}/especialidad/registrar/${idCareer}`, specialty).toPromise();
  }

  putSpecialty(idCareer: string, idSpecialty: string, specialty: SpecialtyModel){
    return this.http.put(`${this.URL}/especialidad/actualizar/${idCareer}/${idSpecialty}`, specialty).toPromise();
  }
}
