import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
// import { AlertModel } from '../../models/alert.model';
// import { TrackingAlertModel } from '../../models/tracking.model';
// import { ReasonsModel } from '../../models/reasons-crde.model';

@Injectable({
  providedIn: 'root'
})
export class TrackingAlertsService {

  url = environment.urlGlobal;

  constructor(private http :HttpClient) { }

  // getAlertTracking(idAlert: string){
  //   return this.http.get(`${this.url}/Alerts/obtener/${idAlert}`).toPromise();
  // }

  getAlertData(id: string){
    return this.http.get(`${this.url}/Alerts/obtenerAlerta/${id}`).toPromise();
  }

  getSeguimiento(idAlert: string){
    return this.http.get(`${this.url}/seguimiento/obtener/${idAlert}`).toPromise();
  }

  RegistrarSeguimiento(idAlert: string, model: any){
    return this.http.post(`${this.url}/seguimiento/registrar/${idAlert}`, model).toPromise();
  }

  // postComentar(){
  //   return this.http
  // }

  
}