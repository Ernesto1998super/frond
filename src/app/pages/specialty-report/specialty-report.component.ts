import { SpecialtyService } from '../../services/specialties/specialty.service';
import { Component, OnInit } from '@angular/core';
import { SpecialtyModel } from '../../models/specialty';
import { ActivatedRoute, Router } from '@angular/router';
import { CareersService } from '../../services/careers/careers.service';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';



@Component({
  selector: 'app-specialty-report',
  templateUrl: './specialty-report.component.html',
  styleUrls: ['./specialty-report.component.css']
})
export class SpecialtyReportComponent implements OnInit {

  specialties: SpecialtyModel[] = [];
  pageActual: number;
  searchText: any;
  actualizar: boolean = false;
  cargando: boolean;
  refresh: boolean;
  idCareer: string;
  idSpecialty: string;
  activo: boolean = true;
  arraySpeciality = [];
  title: string;


  constructor(private specialtyService: SpecialtyService, private careersService: CareersService, private activatedRoute: ActivatedRoute, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

  ngOnInit(): void {
    this.idCareer = this.activatedRoute.snapshot.params.id; 
    this.getSpecialties(this.idCareer);
    this.arraySpeciality = [];
    this.title = 'Reporte de Especialidades';
  }

  getSpecialties(id: string){
    this.cargando = true;
    this.careersService.getCarrerByid(id).then((res:any) => {
      this.cargando = false;
      console.log(res);
      console.log(res.cnt[0].aJsnEspecialidad);
      this.specialties = res.cnt[0].aJsnEspecialidad;
      for (const speciality of this.specialties) {
        let element = [
          speciality.strEspecialidad.replace(/\:null/gi,':""')
        ];
        this.arraySpeciality.push(element);
      }
    }).catch(err => {
      console.log(err.msg);
    });
  }

  actualizarEspecialidad(value: boolean, _id: string){
    this.actualizar = value;
    this.idSpecialty = _id
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
        text: "Nombre de la Especialidad",
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
      this.arraySpeciality,
      "center"
    );
  }

  exportAsXLSX(){
    if (this.specialties.length !== 0) {
      let jsonobject = JSON.stringify(this.specialties);
      jsonobject = jsonobject.replace(/strEspecialidad/gi, 'Nombre');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].created_at;
        delete jsonobject2[i].updated_at;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this._excelService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }
  }

}
