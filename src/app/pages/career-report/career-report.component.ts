import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CareersService } from '../../services/careers/careers.service';
import { CareerModel } from '../../models/career';
import { ActivatedRoute, Router } from '@angular/router';
import { PdfServiceService } from 'src/app/services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';

@Component({
  selector: 'app-career-report',
  templateUrl: './career-report.component.html',
  styleUrls: ['./career-report.component.css']
})
export class CareerReportComponent implements OnInit {
  @Input() paquetito: any;
  @Input() carrerModel: CareerModel[]; 
  @Output() salida = new EventEmitter();
  careers: CareerModel[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idCareer: string;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayCareer = [];


  constructor(private careerService: CareersService, private route: Router, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

  ngOnInit(): void {
    this.getCareeers();
    this.arrayCareer = [];
    this.title = 'Reporte de Carreras';
  }
  
  getCareeers(){
    this.cargando=true;
    this.careerService.getCareers().then((res: any) => {
      this.cargando=false;
      this.careers = res.cnt;
      for (const c of this.careers) {
        let element = [
          c.strCarrera.replace(/\:null/gi,':""')
        ];
        this.arrayCareer.push(element);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  actualizarCarrera(valueUpdate: boolean, _id: string){
    this.actualizar = valueUpdate;
    this.idCareer = _id;
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
      this.arrayCareer,
      "center"
      
    );
  
  }

  exportAsXLSX() {
    if (this.careers.length !== 0) {
      let jsonobject = JSON.stringify(this.careers);
      jsonobject = jsonobject.replace(/strCarrera/gi, 'Nombre');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].created_at;
        delete jsonobject2[i].updated_at;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i].aJsnEspecialidad;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }

  }

}
