import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { SubjectModel } from '../../../models/subjects.model';
import { NgForm } from '@angular/forms';
import { SubjectsService } from '../../../services/subjects/subjects.service';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
 
@Component({
  selector: 'app-update-subjects',
  templateUrl: './update-subjects.component.html',
  styleUrls: ['./update-subjects.component.css']
})
export class UpdateSubjectsComponent implements OnInit {

  
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idAsig: string;

  sub: SubjectModel = new SubjectModel();

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit(): void {
    this.getAsignatura();
  }


  updateAsignatura(form: NgForm){
    this.subjectsService.putAsignatura(this.idAsig, this.sub).then(res => {
      console.log(res);
      Toast.fire({
        icon: 'success',
        title: `¡La Asignatura ${this.sub.strAsignatura} se actualizó exitosamente!`
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

  getAsignatura() {
    this.subjectsService.getAsignaturaByid(this.idAsig).then((res: any) => {
      console.log(res);
      this.sub = res.cnt[0];
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
