import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AlertModel } from '../../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  readonly URL = environment.urlGlobal;

  constructor(private http: HttpClient) { }

  postAlerta(fd: any) {
    return this.http.post(`${this.URL}/alerts/registrar`, fd).toPromise();
  }

  getAlerts(idRol: string, idUser: string){
    return this.http.get(`${this.URL}/alerts/obtenerAlertas/${idRol}/${idUser}`).toPromise();
  }
}
