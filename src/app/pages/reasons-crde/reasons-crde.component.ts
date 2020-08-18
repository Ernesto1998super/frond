import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { ReasonsService } from 'src/app/services/reasons-crde/reasons-crde.service';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';

@Component({
  selector: 'app-reasons-crde',
  templateUrl: './reasons-crde.component.html',
  styleUrls: ['./reasons-crde.component.css']
})
export class ReasonsCRDEComponent implements OnInit {

  
  reasons: ReasonsModel[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idReasons: string;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayReasons = [];


  constructor(private ReasonsService: ReasonsService, private route: Router, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

  ngOnInit(): void {
    this.getReasons();
    this.arrayReasons = [];
    this.title = 'Reporte de Categorias';
  }
  
  getReasons(){
    this.cargando = true;
    this.ReasonsService.getReasons().then((res: any) => {
      this.cargando = false;
      this.reasons = res.cnt;
      console.log(res.cnt);
      for (const c of this.reasons) {
        let element = [
          c.strCategoria.replace(/\:null/gi,':""')
        ];
        this.arrayReasons.push(element);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  actualizarCategoria(valueUpdate: boolean, _id: string){
    this.actualizar = valueUpdate;
    this.idReasons = _id;
  }

  updateCanceled(e) {
    this.actualizar = e;
  }

  refreshTable(e) {
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  exportPDF() {
    let header = [
      {
        text: "Nombre de la Categoria",
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
      this.arrayReasons,
      "center"
    );
  }

  exportAsXLSX() {
    if (this.reasons.length !== 0) {
      let jsonobject = JSON.stringify(this.reasons);
      jsonobject = jsonobject.replace(/strCategoria/gi, 'Nombre');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].createdAt;
        delete jsonobject2[i].updatedAt;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i].aJsnMotivo;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }

  }

}