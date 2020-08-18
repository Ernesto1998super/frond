import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from 'src/app/services/change-password/change-password.service';
import { ChangePasswordModel } from 'src/app/models/change-password.model';
import { User } from 'src/app/models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  checkB:Boolean;
  user:User = new User();
  repetPassword:String;
  token: string;
  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');
  password:ChangePasswordModel= new ChangePasswordModel();
 
        
  constructor( private activatedRoute: ActivatedRoute, private changePasswordService: ChangePasswordService,  public router:Router) { }
 
  ngOnInit(): void {
    init_plugins();
    this.token = this.activatedRoute.snapshot.params.token;
  }
  check(event){
    console.log(event.explicitOriginalTarget.checked);
    this.checkB = event.explicitOriginalTarget.checked
 
  }
 
  changePassword(form: NgForm){
 
 
    
   this.changePasswordService.changepassword(this.token,this.password).then((data:any) =>{
     Swal.fire({
        text: 'Contraseña actualizada corractamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.router.navigate(['/login']);
   })
   .catch(err=>{
     console.log(err);
   }) 
  }

}
