import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AlertStatusModel } from '../../../models/alert-status.model';
import { NgForm } from '@angular/forms';
import { AlertStatusService } from '../../../services/alert-status/alert-status.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {

  estatus: AlertStatusModel = new AlertStatusModel();
  @Input() idEstatus: string;
  @Output() actualizado = new EventEmitter();
  @Output() cancelUpdate = new EventEmitter();

  constructor( private _estatusService: AlertStatusService) { }

  ngOnInit(): void {
    this.getEstatusId(this.idEstatus);
  }

  getEstatusId(id: string) {
    this._estatusService.getStatusId(id).then((data: any) => {
      console.log(data);
      this.estatus = data.cnt[0];
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: `No fue posible registrar el estatus "${this.estatus.strNombre}"!`
      });
    });
  }

  updateStatus(forma: NgForm) {
    this._estatusService.putStatus(this.idEstatus, this.estatus).then((resp) => {
      this.actualizado.emit(true);
      Toast.fire({
        icon: 'success',
        title: `¡El estatus se actualizó exitosamente!`
      });
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: `¡${err.resp}!`
      });
    });
  }

  calcelUpdate() {
    this.cancelUpdate.emit(true);
  }
}
