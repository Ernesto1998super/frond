import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';


@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  getReasons(){
    return this.http.get(`${this.URL}/crde/obtener`).toPromise();
  }

  getReasonsByid(idReasons: string){
    return this.http.get(`${this.URL}/crde/obtener/${idReasons}`).toPromise();
  }

  postReasons(reasons: ReasonsModel){
    return this.http.post(`${this.URL}/crde/registrar`, reasons).toPromise();
  }

  putReasons(idReasons: string, reasons: ReasonsModel){
    return this.http.put(`${this.URL}/crde/actualizar/${idReasons}`, reasons).toPromise();
  }

}

