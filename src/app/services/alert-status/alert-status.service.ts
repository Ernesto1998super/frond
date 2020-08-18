import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AlertStatusModel } from '../../models/alert-status.model';

@Injectable({
  providedIn: 'root'
})
export class AlertStatusService {

  url = environment.urlGlobal;

  constructor( private http: HttpClient) { }

  getAllStatus() {
    return this.http.get(`${this.url}/estatus/obtener`).toPromise();
  }

  getStatusId(id: string) {
    return this.http.get(`${this.url}/estatus/obtener/${id}`).toPromise();
  }

  postStatus(estatus: AlertStatusModel) {
    return this.http.post(`${this.url}/estatus/registrar`, estatus).toPromise();
  }

  putStatus(id: string, data: AlertStatusModel) {
    return this.http.put(`${this.url}/estatus/actualizar/${id}`, data).toPromise();
  }
}
