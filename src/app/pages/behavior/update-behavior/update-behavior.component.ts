import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorService } from '../../../services/behavior/behavior.service';
import { ReasonsService } from '../../../services/reasons-crde/reasons-crde.service';
import { BehaviorModel } from '../../../models/behavior.model';
import { NgForm } from '@angular/forms';
import { ReasonsModel } from 'src/app/models/reasons-crde.model';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });
@Component({
  selector: 'app-update-behavior',
  templateUrl: './update-behavior.component.html',
  styleUrls: ['./update-behavior.component.css']
})

export class UpdateBehaviorComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idReasons: string;
  @Input() idBehavior: string;
  behavior: BehaviorModel = new BehaviorModel();
  reasons: ReasonsModel = new ReasonsModel();

  behaviors: BehaviorModel[] = [];
  strBeha: string;
  blnEst: boolean;

  constructor(private behaviorService: BehaviorService, private reasonsService: ReasonsService) { }

  ngOnInit(): void {
    this.getBehavior(this.idReasons);
  }

  getBehavior(idC: string){
    this.reasonsService.getReasonsByid(idC).then((res:any) => {
      console.log(res);
      console.log(res.cnt[0].aJsnMotivo);
      this.behaviors = res.cnt[0].aJsnMotivo;
      this.behaviors.forEach(element => {
        if (element._id === this.idBehavior){
          console.log(element._id);
          this.behavior.strNombre = element.strNombre;
          this.behavior.strClave= element.strClave;
          this.behavior.blnStatus = element.blnStatus;
        }
     });
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
    
      });
    });
  }

  updateBehavior(forma: NgForm){
    this.behaviorService.putBehavior(this.idReasons, this.idBehavior, this.behavior).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La conducta ${this.behavior.strNombre} se actualizó exitosamente!`
      });
      this.optionCancel.emit(false);
      this.refresh.emit(true);
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
