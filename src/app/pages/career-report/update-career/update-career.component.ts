import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CareersService } from '../../../services/careers/careers.service';
import { CareerModel } from 'src/app/models/career';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-update-career',
  templateUrl: './update-career.component.html',
  styleUrls: ['./update-career.component.css']
})
export class UpdateCareerComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idCareer: string;

  career: CareerModel = new CareerModel();

  constructor(private carrerService: CareersService) { }

  ngOnInit(): void {
    this.getCarrer();
  }


  updateCareer(form: NgForm){
    this.carrerService.putCareer(this.idCareer, this.career).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La carrera ${this.career.strCarrera} se actualizó exitosamente!`
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

  getCarrer() {
    this.carrerService.getCarrerByid(this.idCareer).then((res: any) => {
      this.career = res.cnt[0];
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
