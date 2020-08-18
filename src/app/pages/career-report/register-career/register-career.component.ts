import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CareerModel } from '../../../models/career';
import { NgForm } from '@angular/forms';
import { CareersService } from '../../../services/careers/careers.service';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });


@Component({
  selector: 'app-register-career',
  templateUrl: './register-career.component.html',
  styleUrls: ['./register-career.component.css']
})

export class RegisterCareerComponent implements OnInit {

  @Output() refresh = new EventEmitter();
  career: CareerModel = new CareerModel();
  isActive: boolean;
  

  constructor(private careersService: CareersService) { }

  ngOnInit(): void {
  }

  saveCareer(form: NgForm) {
    this.careersService.postCarrer(this.career).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La carrera ${this.career.strCarrera} se registró exitosamente!`
      });
      form.reset();
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