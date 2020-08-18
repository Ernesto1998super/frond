import { Component, OnInit } from '@angular/core';
import { AlertModel } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';
import { BehaviorModel } from '../../models/behavior.model';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { environment } from '../../../environments/environment.prod';
import * as jwt_decode from 'jwt-decode';
import { CareersService } from 'src/app/services/careers/careers.service';
import { log } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alerts: AlertModel[] = [];
  arrayAlerts = [];
  nuevo: string = environment.nuevo;
  enProgreso: string = environment.seguimiento;
  cerrado: string = environment.cerrado;
  finalizado: string = environment.finalizado;
  arrayCrde = [];
  title: string
  estatusAC: boolean;
  estatusS:boolean;
  cargando: boolean;
  token: string;
  tokenDecoded: any;
  idPersona: any;
  idRol: any;
  strCarrera: string;
  alert: AlertModel =new AlertModel();


  constructor(private alertService: AlertService, private router: Router, private _PdfService: PdfServiceService, private _excelService: ExportDataService, private carreraService: CareersService) { }

  ngOnInit() {
    this.title = 'Reporte de Alertas';
    this.token = localStorage.token;
    this.tokenDecoded = jwt_decode(this.token)
    console.log(this.tokenDecoded);
    console.log(this.tokenDecoded.user._id);
    console.log(this.tokenDecoded.user.idRole);
    this.getAlert();
    // nuevo: string = environment.nuevo;
    // enProgreso: string = environment.seguimiento;
    // cerrado: string = environment.cerrado;
    // finalizado: string = environment.finalizado;
    
  }

  redirigir() {
    this.router.navigate(['/registro-alerta']);
  }

  getAlert(){
    this.cargando = true;
    this.idPersona = this.tokenDecoded.user._id;
    console.log(this.idPersona,'-------------');
    this.idRol = this.tokenDecoded.user.idRole;
    this.alertService.getAlerts(this.idRol, this.idPersona).then((res: any) => {

      console.log(res);
      this.cargando = false;
      this.alerts = res.cnt;
      console.log(this.alerts);
      
    }).catch(err => {
      console.log(err.msg);
    });
  }

  exportPDF() {
    let header = [
      {
        text: "Nombre de la Carrera",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }
    ];
    this._PdfService.generatePdf(
      this.title,
      header,
      this.arrayAlerts,
      "center"
    );
  }

  exportAsXLSX() {
    if (this.alerts.length !== 0) {
      let jsonobject = JSON.stringify(this.alerts);
      jsonobject = jsonobject.replace(/strCarre/gi, 'Nombre');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].created_at;
        delete jsonobject2[i].updated_at;
        delete jsonobject2[i].blnStatus;
        //delete jsonobject2[i].aJsnEspecialidad;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }

  }


}