import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertStatusModel } from '../../../models/alert-status.model';
import { AlertStatusService } from '../../../services/alert-status/alert-status.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-register-status',
  templateUrl: './register-status.component.html',
  styleUrls: ['./register-status.component.css']
})
export class RegisterStatusComponent implements OnInit {

  estatus: AlertStatusModel = new AlertStatusModel();
  @Output() registrado = new EventEmitter();

  constructor(private _estatusService: AlertStatusService) { }

  ngOnInit(): void {
  }

  saveStatus(forma: NgForm) {
    this._estatusService.postStatus(this.estatus).then((data: any) => {
      console.log(data);
      this.registrado.emit(true);
      Toast.fire({
        icon: 'success',
        title: `¡El estatus "${this.estatus.strNombre}" se registro exitosamente!`
      });
      forma.reset();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: `¡${err.error.msg}!`
      });
      forma.reset();
    });
  }
}
