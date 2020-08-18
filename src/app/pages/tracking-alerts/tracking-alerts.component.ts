import { TrackingAlertsService } from '../../services/tracking-alerts/tracking-alerts.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import { AlertModel } from '../../models/alert.model';
import { User } from '../../models/user.model';
import { SubjectModel } from '../../models/subjects.model';
import { environment } from 'src/environments/environment.prod';
import { ModalityModel } from '../../models/modality.model';
import { TrackingAlertModel } from '../../models/tracking.model';
import { AlertStatusModel } from '../../models/alert-status.model';
import { AlertStatusService } from '../../services/alert-status/alert-status.service';
import { NgForm } from '@angular/forms';
import { ReasonsService } from '../../services/reasons-crde/reasons-crde.service';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';
import { FileModel } from '../../models/file.model';





const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-tracking-alerts',
  templateUrl: './tracking-alerts.component.html',
  styleUrls: ['./tracking-alerts.component.css']
})
export class TrackingAlertsComponent implements OnInit {

  nuevo: string = environment.nuevo;
  cerrado: string = environment.cerrado;
  finalizado: string = environment.finalizado;
  enProgreso: string = environment.seguimiento;

  arrTracking: TrackingAlertModel[] = [];
  arrFiles: FileModel[] = [];
  arrEstatus: AlertStatusModel[] = [];
  arrReasons: ReasonsModel[] = [];
  objTracking: TrackingAlertModel = new TrackingAlertModel();
  objModality: ModalityModel = new ModalityModel();
  objSubject: SubjectModel = new SubjectModel();
  objAlert: AlertModel = new AlertModel();
  objUser: User = new User();
  asignatura: string;
  tokenDecoded: any;
  idPersona: string;
  userName: string;
  idAlert: string;
  idUser: string;
  cargando: boolean;
  documento: any;

  constructor(private trackingAlertsService: TrackingAlertsService, private alertStatusService: AlertStatusService, private reasonsService: ReasonsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let token = localStorage.token;
    this.idAlert = this.activatedRoute.snapshot.params.id;
    this.tokenDecoded = jwt_decode(token);
    console.log(this.idAlert,'-------------------------alerta');
    this.obtenerAlerta(this.idAlert);
    this.obtenerEstatus();
  }

  obtenerAlerta(idAlert: string){
    this.trackingAlertsService.getAlertData(idAlert).then((res: any) => {
      this.objAlert = res.cnt[0];
      console.log(this.objAlert);
      this.objUser = res.cnt[0].idUser;
      this.objSubject = res.cnt[0].idAsignatura;
      this.objModality = res.cnt[0].idModalidad;
      this.arrReasons = res.cnt[0].arrCrde;
      this.arrFiles = res.cnt[0].aJsnEvidencias;
      this.userName = `${this.objUser.strName} ${this.objUser.strLastName} ${this.objUser.strMotherLastName}`;
    }).catch(err => {
      console.log(err);
    });
  }

  obtenerEstatus(){
    this.alertStatusService.getAllStatus().then((res: any) => {
      this.arrEstatus = res.cnt;
    }).catch(err => {
      console.log(err);
    });
  }

  obtenerSeguimiento(idAlert: string){
    this.trackingAlertsService.getSeguimiento(idAlert).then((res: any) => {
      this.arrTracking = res.cnt;
      console.log(this.arrTracking);
    }).catch(err => {
      console.log(err);
    });
  }

  obtenerArchivos(archivos: any) {
    this.documento = archivos;
  }

  comentarAlerta(form: NgForm){
    let fd = new FormData();

    fd.append('idUser', this.tokenDecoded.user._id);
    fd.append('idEstatus', this.objTracking.idEstatus);
    fd.append('strComentario', this.objTracking.strComentario);
    // if(this.objTracking.aJsnEvidencias !== null){
    //   for(let i = 0; i < this.objTracking.aJsnEvidencias.lenght; i++){
        fd.append('strFileEvidencia', this.documento);
    //   }
    // }

    this.trackingAlertsService.RegistrarSeguimiento(this.idAlert, fd).then((res: any) => {
      console.log('Parece que funciono');
      console.log(res.cnt);
    }).catch(err => {
      console.log(err);
    })
  }

}
