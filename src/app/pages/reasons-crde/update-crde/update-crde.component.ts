import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CareerModel } from 'src/app/models/career';
import { CareersService } from 'src/app/services/careers/careers.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';
import { ReasonsService } from 'src/app/services/reasons-crde/reasons-crde.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-update-crde',
  templateUrl: './update-crde.component.html',
  styleUrls: ['./update-crde.component.css']
})
export class UpdateCrdeComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idReasons: string;
  


  reasons: ReasonsModel = new ReasonsModel();

  constructor(private reasonsService: ReasonsService) { }

  ngOnInit(): void {
    this.getCategoria();
  }


  updateCategoria(form: NgForm){
    this.reasonsService.putReasons(this.idReasons, this.reasons).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La categoria ${this.reasons.strCategoria} se actualizó exitosamente!`
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

  getCategoria() {
    this.reasonsService.getReasonsByid(this.idReasons).then((res: any) => {
      this.reasons = res.cnt[0];
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