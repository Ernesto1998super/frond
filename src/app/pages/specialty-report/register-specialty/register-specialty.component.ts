import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SpecialtyModel } from '../../../models/specialty';
import { NgForm } from '@angular/forms';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-register-specialty',
  templateUrl: './register-specialty.component.html',
  styleUrls: ['./register-specialty.component.css']
})
export class RegisterSpecialtyComponent implements OnInit {

  specialty: SpecialtyModel = new SpecialtyModel();
  @Output() refresh = new EventEmitter();
  @Input() idCareer: string;

  constructor(private specialtyService: SpecialtyService) { }

  ngOnInit(): void {
  }


  saveSpecialty(forma: NgForm){
    this.specialtyService.postSpecialty(this.idCareer,  this.specialty).then(res => {
      console.log(res);
      Toast.fire({
        icon: 'success',
        title: `¡La especialidad ${this.specialty.strEspecialidad} se registró exitosamente!`
      });
      this.refresh.emit(true);
    }).catch(err => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }
}
