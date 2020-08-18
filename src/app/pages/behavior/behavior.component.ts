import { BehaviorService } from '../../services/behavior/behavior.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorModel } from '../../models/behavior.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReasonsService } from '../../services/reasons-crde/reasons-crde.service';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';



@Component({
  selector: 'app-behavior',
  templateUrl: './behavior.component.html',
  styleUrls: ['./behavior.component.css']
})
export class BehaviorComponent implements OnInit {

  behavior: BehaviorModel[] = [];
  pageActual: number;
  searchText: any;
  actualizar: boolean = false;
  cargando: boolean;
  refresh: boolean;
  idReasons: string;
  idBehavior: string;
  activo: boolean = true;
  arrayBehavior = [];
  title: string;


  constructor(private behaviorService: BehaviorService, private reasonsService: ReasonsService, private activatedRoute: ActivatedRoute, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

  ngOnInit(): void {
    this.idReasons = this.activatedRoute.snapshot.params.id; 
    this.getBehavior(this.idReasons);
    this. arrayBehavior = [];
    this.title = 'Reporte de Motivos';
  }

  getBehavior(id: string){ 
    this.cargando = true;
    this.reasonsService.getReasonsByid(id).then((res:any) => {
      this.cargando = false;
      console.log(res);
      console.log(res.cnt[0].aJsnMotivo);
      this.behavior = res.cnt[0].aJsnMotivo;
      for (const behavior of this.behavior) {
        let element = [
          behavior.strNombre.replace(/\:null/gi,':""')
        ];
        this.arrayBehavior.push(element);
      }
    }).catch(err => {
      console.log(err.msg);
    });
  }

  actualizarBehavior(value: boolean, _id: string){
    this.actualizar = value;
    this.idBehavior = _id
  }

  refreshTable(e) {
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  updateCanceled(e){
    this.actualizar = e;
  }


  exportPDF() {
    let header = [
      {
        text: "Nombre de la Conducta",
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
      this.arrayBehavior,
      "center"
    );
  }

  exportAsXLSX(){
    if (this.behavior.length !== 0) {
      let jsonobject = JSON.stringify(this.behavior);
      jsonobject = jsonobject.replace(/strNombre/gi, 'Nombre');
      jsonobject = jsonobject.replace(/strClave/gi, 'Clave');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].createdAt;
        delete jsonobject2[i].updatedAt;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }
  }

}