import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorModel } from '../../../models/behavior.model';
import { NgForm } from '@angular/forms';
import { BehaviorService } from '../../../services/behavior/behavior.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-register-behavior',
  templateUrl: './register-behavior.component.html',
  styleUrls: ['./register-behavior.component.css']
})
export class RegisterBehaviorComponent implements OnInit {

  behavior: BehaviorModel = new BehaviorModel();
  @Output() refresh = new EventEmitter();
  @Input() idReasons: string;

  constructor(private behaviorService: BehaviorService) { }

  ngOnInit(): void {
  }
 

  saveBehavior(forma: NgForm){
    this.behaviorService.postBehavior(this.idReasons,  this.behavior).then(res => {
      console.log(res);
      Toast.fire({
        icon: 'success',
        title: `¡La conducta ${this.behavior.strNombre} se registró exitosamente!`
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
