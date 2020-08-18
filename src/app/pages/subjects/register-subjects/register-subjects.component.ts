import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CareersService } from '../../../services/careers/careers.service';
import { CareerModel } from '../../../models/career';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SubjectModel } from 'src/app/models/subjects.model';
import { SubjectsService } from '../../../services/subjects/subjects.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-register-subjects',
  templateUrl: './register-subjects.component.html',
  styleUrls: ['./register-subjects.component.css']
})
export class RegisterSubjectsComponent implements OnInit {

 
  @Output() refresh = new EventEmitter();
  sub: SubjectModel = new SubjectModel();
  isActive: boolean;
  

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit(): void {
  }

  saveAgignatura(form: NgForm) {
    this.subjectsService.postAsignatura(this.sub).then(res => {
      console.log(res);
      Toast.fire({
        icon: 'success',
        title: `¡La Asignatura ${this.sub.strAsignatura} se registró exitosamente!`
      });
      form.controls['strAsignatura'].reset();
      form.controls['strSiglas'].reset();
      this.refresh.emit(true);
    }).catch(err => {
    
      Toast.fire({
        icon: 'error',
        title: err.error.msg
       
      });
    });
  }

}