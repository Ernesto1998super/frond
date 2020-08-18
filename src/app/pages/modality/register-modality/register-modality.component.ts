import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalityService } from '../../../services/modality/modality.service';
import { NgForm } from '@angular/forms';
import { ModalityModel } from '../../../models/modality.model';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-register-modality',
  templateUrl: './register-modality.component.html',
  styleUrls: ['./register-modality.component.css']
})
export class RegisterModalityComponent implements OnInit {

  
  @Output() refresh = new EventEmitter();
  mod: ModalityModel = new ModalityModel();
  isActive: boolean;
  

  constructor(private modalityService: ModalityService) { }

  ngOnInit(): void {
  }

  saveModalidad(form: NgForm) {
    this.modalityService.postModalidades(this.mod).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La Modalidad ${this.mod.strModalidad} se registró exitosamente!`
      });
      form.controls['strModalidad'].reset(); 
    
      this.refresh.emit(true);
    }).catch(err => {
    
      Toast.fire({
        icon: 'error',
        title: err.error.msg
       
      });
    });
  }

}