import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { SubjectModel } from '../../models/subjects.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  readonly URL = environment.urlGlobal;


  constructor(private http: HttpClient) { }


  getAsignatura(){
    return this.http.get(`${this.URL}/asignatura/obtener`).toPromise();
  }

  getAsignaturaByid(idAsignatura: string){
    return this.http.get(`${this.URL}/asignatura/obtener/${idAsignatura}`).toPromise();
  }

  postAsignatura(subject:SubjectModel ){
    return this.http.post(`${this.URL}/asignatura/registrar`, subject).toPromise();
  }

  putAsignatura(idAsig: string, subject: SubjectModel){
    return this.http.put(`${this.URL}/asignatura/actualizar/${idAsig}`, subject).toPromise();
  }

  deleteAsignatura(idAsig: string){
    return this.http.delete(`${this.URL}/asignatura/eliminar/${idAsig}`).toPromise();
  }

  activoAsignatura(idAsig: string){
    return this.http.delete(`${this.URL}/asignatura/activo/${idAsig}`).toPromise();
  }

}