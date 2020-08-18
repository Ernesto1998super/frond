import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertStatusModel } from 'src/app/models/alert-status.model';
import { AlertStatusService } from '../../services/alert-status/alert-status.service';
import Swal from 'sweetalert2';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-status-report',
  templateUrl: './status-report.component.html',
  styleUrls: ['./status-report.component.css']
})
export class StatusReportComponent implements OnInit {

  estatus: AlertStatusModel[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  recargar: boolean = false;
  actualizar: boolean = false;
  idEstatus: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayEstatus = [];


  constructor( private _estatusService: AlertStatusService, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

  ngOnInit(): void {
    this.title = 'Reporte de Estatus';
    this.arrayEstatus = [];
    this.getEstatus();
  }

  getEstatus() {
    this.cargando = true;
    this._estatusService.getAllStatus().then((data: any) => {
      this.cargando = false;
      console.log(data);
      this.estatus = data.cnt;
      for (const s of this.estatus) {
        let element = [
          s.strNombre.replace(/\:null/gi,':""'),
          s.strDescripcion.replace(/\:null/gi,':""')
        ];
        this.arrayEstatus.push(element);
      }
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: `¡${err.msg}!`
      });
    });
  }

  actualizarEstatus(dato: boolean, id: string) {
    this.actualizar = dato;
    this.idEstatus = id;
  }

  recargarTabla(registrado: boolean) {
    this.recargar = registrado;
    if (this.recargar) {
      this.ngOnInit();
      this.actualizar = false;
    }
  }

  cancelUpdate(cancel: boolean) {
    if (cancel) {
      this.actualizar = false;
    }
  }

  exportAsXLSX() {
    if (this.estatus.length !== 0) {
      let jsonobject = JSON.stringify(this.estatus);
      jsonobject = jsonobject.replace(/strNombre/gi, 'Nombre');
      jsonobject = jsonobject.replace(/strDescripcion/gi, 'Descripción');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].createdAt;
        delete jsonobject2[i].updatedAt;
        delete jsonobject2[i].blnActivo;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }
  }

  exportPDF() {
    let header = [
      {
        text: "Estatus",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Descripción",
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
      this.arrayEstatus,
      "center"
    );
  }

}
