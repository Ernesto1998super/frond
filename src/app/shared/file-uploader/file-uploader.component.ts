import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FileModel } from 'src/app/models/file.model';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  @ViewChild('myPond') myPond: any;
  @Output() archivosObtenidos = new EventEmitter();
  evidencias: Array<any> = [];
  evidencia: FileModel;
  pondOptions: any;
  archivo: any;

  constructor() {}

  ngOnInit() {
    this.pondOptions = {
      class: 'my-filepond',
      multiple: true,
      labelIdle: 'Arrasta tus documentos <span>aqui</span>',
      FilePondPluginImagePreview: true,
      server: {
        process: (fieldName, file, metadata, load) => {
          // simulates uploading a file
          setTimeout(() => {
            this.cargarArchivo();
            load();
          }, 500);
        },
        load: (source, load) => {
          // simulates loading a file from the server
          fetch(source).then(res => res.blob()).then(load);
        }, revert: (uniqueFileId, load, error) => {
          error('oh my goodness');
          load();
      }},
      instantUpload: true,
      imagePreviewTransparencyIndicator: 'grid'
    };

    this.pondHandleInit();
  }

  // tslint:disable-next-line: member-ordering
  pondFiles = [];

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    this.archivo = event.file.source;
  }

  cargarArchivo() {
    this.archivosObtenidos.emit(this.archivo);
}
}
