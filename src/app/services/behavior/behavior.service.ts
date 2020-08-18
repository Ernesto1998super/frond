import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorModel } from '../../models/behavior.model';



@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  getMotivos() {
    return this.http.get(`${this.URL}/motivosCrde/obtener`).toPromise();
  }

  getBehavior(idReasons: string){
    return this.http.get(`${this.URL}/motivosCrde/${idReasons}`).toPromise();
  }

  postBehavior(idReasons: string, behavior: BehaviorModel){
    return this.http.post(`${this.URL}/motivosCrde/registrar/${idReasons}`, behavior).toPromise();
  }

  putBehavior(idReasons: string, idBehavior: string, behavior: BehaviorModel){
    return this.http.put(`${this.URL}/motivoscrde/actualizar/${idReasons}/${idBehavior}`, behavior).toPromise();
  }
}