import { RegisterService } from '../services/login/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  checkB: Boolean;
  user: User = new User();
  repetPassword: String;

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  regexp = new RegExp('^[_A-Za-z\\+]+(\\.[_A-Za-z]+)*@utags.edu.mx$');

  check(event){
    console.log(event.explicitOriginalTarget.checked);
    this.checkB = event.explicitOriginalTarget.checked
  }

  addUser(form: NgForm){
    console.log(this.user);

    if (this.repetPassword != this.user.strPassword) {
     
      Swal.fire({
        title: 'Error!',
        text: 'Error las contraseñas no son iguales, no creamos tu usuario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(['/register'])
    }else if (this.regexp.test(this.user.strEmail)){
     console.log(form.value);
      this.registerService.postUser(form.value)
      .then(res => {
        console.log(res);
        let data = JSON.stringify(res);
        let dataJson = JSON.parse(data);
        localStorage.setItem('token', dataJson.token);
        Swal.fire({
          title: '¡Correcto!',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })

        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['/register']) 
      })
    }
  }

}
