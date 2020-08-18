import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/excel/export-to-excel.service';
import { ModalityService } from '../../services/modality/modality.service';
import { ModalityModel } from '../../models/modality.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
  });

@Component({
  selector: 'app-modality',
  templateUrl: './modality.component.html',
  styleUrls: ['./modality.component.css']
})
export class ModalityComponent implements OnInit {
  @Input() paquetito: any;
  @Input() modalityModel: ModalityModel[]; 
  @Output() salida = new EventEmitter();
  mods: ModalityModel[] = [];
  searchText: any; 
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idMod: string;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayMod = [];

  mod: ModalityModel = new ModalityModel();

  constructor(private modalityService: ModalityService, private route: Router, private _PdfService: PdfServiceService, private _excelService: ExportDataService) { }

 
  ngOnInit(): void {
    this.getModalidades();
    this.arrayMod = [];
    this.title = 'Reporte de Modalidades';
  }
  
  getModalidades(){
    this.cargando = true;
    this.modalityService.getModalidades().then((res: any) => {
     this.cargando = false;
     
      this.mods = res.cnt;
      for (const c of this.mods) {
        let element = [
          c.strModalidad.replace(/\:null/gi,':""'),
        ];
        this.arrayMod.push(element);
      } 
    }).catch(err => {
      console.log(err.msg);
    });
  }

  

  updateModalidad(id:string){
    this.modalityService.putModalidades(id, this.mod).then((res) => {
      this.getModalidades();
      
      Toast.fire({
        icon: 'success',
        title: `¡La Modalidad se actualizó exitosamente!`
      });
    }).catch(err => {
    
      Toast.fire({
        icon: 'error',
        title: err.error.msg
   
      });
    });
  }
  deleteModalidad(id: string){
    this.modalityService.deleteModalidades(id).then((data) => {
      this.getModalidades();
      Toast.fire({
        icon: 'success',
        title: `¡La Modalidad se actualizó exitosamente!`
      });
    }).catch((err) => {

      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
   
    });
  });
  
  }
  
  refreshTable(e) {
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }
 

  actualizarModalidad(valueUpdate: boolean, _id: string){
    this.actualizar = valueUpdate;
    this.idMod = _id;
 
  }

  updateCanceled(e) {
    this.actualizar = e;
  }

  actexportPDF () {
     
        this.exportPDF();
        this.ngOnInit();
      }
    
  
  

  exportPDF() {
   var data =[this.arrayMod];
   data=[];
    let header = [
      {
        text: "Nombre de la Modalidad",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
    ]; 
    this._PdfService.generatePdf(
      this.title,
      header,
      this.arrayMod,
      "center",
    );
    
    
  }


  exportAsXLSX() {
    if (this.mods.length !== 0) {
      let jsonobject = JSON.stringify(this.mods);
      jsonobject = jsonobject.replace(/strModalidad/gi, 'Nombre');
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
