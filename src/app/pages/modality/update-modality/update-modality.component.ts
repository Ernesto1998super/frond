import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModalityModel } from '../../../models/modality.model';
import { ModalityService } from '../../../services/modality/modality.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
  });

  @Component({
  selector: 'app-update-modality',
  templateUrl: './update-modality.component.html',
  styleUrls: ['./update-modality.component.css']
  })

  


  export class UpdateModalityComponent implements OnInit {



  
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idMod: string;

  mod: ModalityModel = new ModalityModel();

  constructor(private modalityService: ModalityService) { }

  ngOnInit(): void {
    this.getModalidades();
  }


  updateModalidad(form: NgForm){
    this.modalityService.putModalidades(this.idMod, this.mod).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La Modalidad ${this.mod.strModalidad} se actualizó exitosamente!`
      });
      form.reset();
      this.optionCancel.emit(false);
      this.refresh.emit(true);
 
    }).catch(err => {
     
      Toast.fire({
        icon: 'error',
        title: err.error.msg
   
      });
      form.reset();
    });
  }
 
  getModalidades() {
    this.modalityService.getModalidadesByid(this.idMod).then((res: any) => {
      this.mod = res.cnt[0];
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
       
      });
    });
  }

  updateCanceled(){
    this.optionCancel.emit(false);
  }

}
