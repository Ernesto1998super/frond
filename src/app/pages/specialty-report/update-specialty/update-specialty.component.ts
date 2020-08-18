import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SpecialtyService } from '../../../services/specialties/specialty.service';
import { CareersService } from '../../../services/careers/careers.service';
import { SpecialtyModel } from '../../../models/specialty';
import { NgForm } from '@angular/forms';
import { CareerModel } from 'src/app/models/career';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });
@Component({
  selector: 'app-update-specialty',
  templateUrl: './update-specialty.component.html',
  styleUrls: ['./update-specialty.component.css']
})

export class UpdateSpecialtyComponent implements OnInit {

  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idCareer: string;
  @Input() idSpecialty: string;
  specialty: SpecialtyModel = new SpecialtyModel();
  career: CareerModel = new CareerModel();

  specialties: SpecialtyModel[] = [];
  strEsp: string;
  blnEst: boolean;

  constructor(private specialtyService: SpecialtyService, private careersService: CareersService) { }

  ngOnInit(): void {
    this.getSpecialties(this.idCareer);
  }

  getSpecialties(idC: string){
    this.careersService.getCarrerByid(idC).then((res:any) => {
      console.log(res.cnt[0].aJsnEspecialidad);
      this.specialties = res.cnt[0].aJsnEspecialidad;
      this.specialties.forEach(element => {
        if (element._id === this.idSpecialty){
          console.log(element._id);
          this.specialty.strEspecialidad = element.strEspecialidad;
          this.specialty.blnStatus = element.blnStatus;
        }
     });
    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }

  updateSpecialty(forma: NgForm){
    this.specialtyService.putSpecialty(this.idCareer, this.idSpecialty, this.specialty).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡La especialidad ${this.specialty.strEspecialidad} se actualizó exitosamente!`
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

