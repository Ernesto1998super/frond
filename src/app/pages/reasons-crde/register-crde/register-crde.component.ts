import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReasonsModel } from '../../../models/reasons-crde.model';
import { NgForm } from '@angular/forms';
import { ReasonsService } from '../../../services/reasons-crde/reasons-crde.service';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });


@Component({
  selector: 'app-register-crde',
  templateUrl: './register-crde.component.html',
  styleUrls: ['./register-crde.component.css']
})
export class RegisterReasonsComponent implements OnInit {

  @Output() refresh = new EventEmitter();
  reasons: ReasonsModel = new ReasonsModel();
  isActive: boolean;
  

  constructor(private reasonsService: ReasonsService) { }

  ngOnInit(): void {
  }

  saveReasons(form: NgForm) {
    this.reasonsService.postReasons(this.reasons).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La categoria ${this.reasons.strCategoria} se registró exitosamente!`
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