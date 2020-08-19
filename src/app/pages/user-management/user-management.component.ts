import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from '../../services/excel/export-to-excel.service';
import { UserManagementService } from '../../services/user-manegement/user-management.service';
import { User } from 'src/app/models/user.model';
import { element, browser } from 'protractor';
import { CareersService } from '../../services/careers/careers.service';
import { CareerModel } from 'src/app/models/career';
import { RoleModel } from '../../models/role.model';
import { RolesService } from '../../services/roles/roles.service';
import { NgForm } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpecialtyModel } from 'src/app/models/specialty';

declare var $: any;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  @Input() paquetito: any;
  @Input() usermanagementModel: User[];
  @Output() salida = new EventEmitter();

  usuarios: User[] = [];
  searchText: any;
  pageActual: number;
  cargando: boolean;
  refresh: boolean = false;
  actualizar: boolean = false;
  idUser: string;
  name: string;
  strLastName: String;
  strMotherLastName: String;
  correoAdmin: string;
  title: string;
  regTerm: boolean = false;
  activo: boolean = true;
  arrayUser = [];
  carreras: CareerModel[] = [];
  userManag: User = new User();

  check = true;


  isActive: boolean;


  // role: RoleModel = new RoleModel();

  roles: RoleModel[] = [];
  arrayRol = [];
  @Output() optionCancel = new EventEmitter();

  user: User = new User();
  claveUsuario: string;
  public role = '';
  status = '';
  arrEspecialidadPermiso = [];


  constructor(private usermanagementService: UserManagementService,
    private route: Router, private _PdfService: PdfServiceService,
    private userService: UserManagementService, private rolesService: RolesService,
    private _excelService: ExportDataService,
    private carreraService: CareersService) { }

  ngOnInit(): void {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 0);

    this.status = '';
    console.log('object');
    console.log(this.role);

    this.getUsuarios();
    this.getRoles();


    // this. getGestiondeUsuarios();
    this.arrayUser = [];
    this.title = 'Reporte de Gestión de Usuarios';
    this.getCarreras();
  }
  getCarreras() {
    this.carreraService.getCareers().then((res: any) => {
      this.carreras = res['cnt'];
    })
  }
  getCarrerasByUser() {

    console.log('especialidades');
    this.carreraService.getCareers().then((res: any) => {
      var count = 0;
      this.carreras = res['cnt'];
      this.carreras.forEach(carrera => {
        console.log('tamaño del arreglo ' + carrera.aJsnEspecialidad.length);
        console.log('tamaño del arreglo ' + this.arrEspecialidadPermiso.length);
        var i = 0;
        for (let carreras of carrera.aJsnEspecialidad) {
          for (let ids of this.arrEspecialidadPermiso) {
            if (carreras['_id'] == ids) {
              i++;
              console.log(i);
              console.log(carreras);
              carreras.check = true;
            }
            if (i == carrera.aJsnEspecialidad.length) {
              carrera.check = true;
            }
          }
        }

      });
    });
  }

  changetodos(carrera: CareerModel) {
    if (this.idUser != undefined) {
    console.log("carrera");
    console.log(this.usuarios);
    let espe = [];
    for(const arrperm of this.arrEspecialidadPermiso){
      for (const carrera of this.carreras) {
        for (const subcategorias of carrera.aJsnEspecialidad) {
          if (subcategorias._id == arrperm) {
            console.log(subcategorias.strEspecialidad);
            espe.push(subcategorias.strEspecialidad);
          }
        }
    }
    }
    if (carrera.check == true) {
        carrera.check = false;
        carrera.aJsnEspecialidad.forEach(especialidad => {
          let index: number = this.arrEspecialidadPermiso.indexOf(especialidad._id);
          console.log("index");
          console.log(index);
          espe.push(especialidad.strEspecialidad);
          if (index !== -1) {
            this.arrEspecialidadPermiso.splice(index, 1);
            especialidad.check = false;
            const updae = this.arrayUser.map(item => item[0]).indexOf(this.name);
            this.arrayUser[updae][3] = espe;   
            const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
            this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
            this.arrEspecialidadPermiso.forEach(per =>{
              this.usuarios[excelUsu].arrEspecialidadPermiso.push(per); 
    
            });
            this.usermanagementService.putUsuarioEspecialidad(this.idUser, this.arrEspecialidadPermiso);
            console.log("putos usuarios")
            console.log(this.usuarios)
          }
        });
      } else {
        carrera.check = true;
        carrera.aJsnEspecialidad.forEach(especialidad => {
          especialidad.check = true;
          console.log(this.arrEspecialidadPermiso.filter(esp => esp == especialidad._id));
          if (this.arrEspecialidadPermiso.filter(esp => esp == especialidad._id).length == 0) {
            this.arrEspecialidadPermiso.push(especialidad._id);
          espe.push(especialidad.strEspecialidad);
          }
        });
     
        const updae = this.arrayUser.map(item => item[0]).indexOf(this.name);
        this.arrayUser[updae][3] = espe; 
        
        const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
        this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
        this.arrEspecialidadPermiso.forEach(per =>{
          this.usuarios[excelUsu].arrEspecialidadPermiso.push(per); 

        })
        console.log("putos usuarios")
        console.log(this.usuarios)   

        this.usermanagementService.putUsuarioEspecialidad(this.idUser, this.arrEspecialidadPermiso);

      }
    }
  }





  changeCheck(especialidad: SpecialtyModel) {
    console.log(especialidad._id);
    if (this.idUser != undefined) {
      let espe = [];
    
      if (especialidad.check == true) {
        especialidad.check = false;
        console.log('arr completo');
        console.log(this.arrEspecialidadPermiso);
        this.arrEspecialidadPermiso.filter(esp => esp !== especialidad._id);
        console.log('arr eliminar elemt ');
        const index: number = this.arrEspecialidadPermiso.indexOf(especialidad._id);
        if (index !== -1) {
          this.arrEspecialidadPermiso.splice(index, 1);
        }
        for(const arrperm of this.arrEspecialidadPermiso){
          for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == arrperm) {
                console.log(subcategorias.strEspecialidad);
                espe.push(subcategorias.strEspecialidad);
              }
            }
    
        }
      }
        const updae = this.arrayUser.map(item => item[0]).indexOf(this.name);
        this.arrayUser[updae][3] = espe; 
        const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
            this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
            this.arrEspecialidadPermiso.forEach(per =>{
              this.usuarios[excelUsu].arrEspecialidadPermiso.push(per); 
    
            });
        console.log(this.arrayUser)  
        console.log(this.arrEspecialidadPermiso);
        this.usermanagementService.putUsuarioEspecialidad(this.idUser, this.arrEspecialidadPermiso);

      } else {
        this.arrEspecialidadPermiso.push(especialidad._id);
        for(const arrperm of this.arrEspecialidadPermiso){
          for (const carrera of this.carreras) {
            for (const subcategorias of carrera.aJsnEspecialidad) {
              if (subcategorias._id == arrperm) {
                console.log(subcategorias.strEspecialidad);
                espe.push(subcategorias.strEspecialidad);
              }
            }
    
        }
      }
        especialidad.check = true;
        const updae = this.arrayUser.map(item => item[0]).indexOf(this.name);
        this.arrayUser[updae][3] = espe; 
        const excelUsu = this.usuarios.map(item => item.strName).indexOf(this.name);
            this.usuarios[excelUsu].arrEspecialidadPermiso = [{}];
            this.arrEspecialidadPermiso.forEach(per =>{
              this.usuarios[excelUsu].arrEspecialidadPermiso.push(per); 
    
            });
        console.log(this.usuarios)  
        this.usermanagementService.putUsuarioEspecialidad(this.idUser, this.arrEspecialidadPermiso);

      }
    }
  }


  // getUsuario(){
  //   this.cargando = true;
  //   this.usermanagementService.getUsuarios().then((res:any) =>{
  //     this.cargando = false;
  //     this.usuarios  = res.usuario;
  //     for(const c of this. usuarios){
  //       let element = [
  //         c.strName.replace(/\:null/gi,':""'),

  //       ];
  //       this.arrayUser.push(element);
  //     }
  //   }).catch(err =>
  //   {
  //     console.log(err);
  //   });
  // }

  // getGestiondeUsuarios(){
  //   this.cargando = true;
  //   this.usermanagementService.getGestiondeUsuarios().then((res: any) => {

  //    this.cargando = false;
  //     this.mods = res.modalidad;
  //     for (const c of this.mods) {
  //       let element = [
  //         c.strGestiondeUsuarios.replace(/\:null/gi,':""'),
  //       ];
  //       this.arrayUser.push(element);
  //     } 
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }




  refreshTable(e) {
    this.refresh = e;
    if (this.refresh) {
      this.ngOnInit();
    }
  }


  actualizarGestiondeUsuarios(valueUpdate: boolean, _id: string) {
    this.actualizar = valueUpdate;
    this.idUser = _id;

  }

  updateCanceled(e) {
    this.actualizar = e;
  }

  actexportPDF() {

    this.exportPDF();
    this.ngOnInit();
  }




  exportPDF() {
    var data = [this.arrayUser];
    data = [];
    let header = [
      {
        text: "Nombre",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Apellido Paterno",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Apellido Materno",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      // {
      //   text: "Correo electrónico ",
      //   style: "tableHeader",
      //   bold: true,
      //   fillColor: "#2a3e52",
      //   color: "#ffffff",
      //   size: 13,
      // },
      {
        text: "Especialidades",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
    ];
    this._PdfService.generatePdf(
      this.title,
      header,
      this.arrayUser,
      "center",
    );


  }


  async  exportAsXLSX()  {
    if (this.usuarios.length !== 0) {
      let espe = [];
      let jsonobject = JSON.stringify(this.usuarios);
      espe = [];
      let users = [];
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;

      for (const j of jsonobject2) {
        console.log(j.strName);
        console.log(j.arrEspecialidadPermiso);
        for (const especialidad of j.arrEspecialidadPermiso) {
          console.log(especialidad)
          for (const carrera of this.carreras) {
              for (const subcategorias of carrera.aJsnEspecialidad) {
                if (subcategorias._id == especialidad) {
                  //console.log(subcategorias.strEspecialidad);
                  espe.push(subcategorias.strEspecialidad);
                }
              }
            
          }
        }
        let element = {
          "Nombre": j.strName,
          "Apellido Paterno": j.strLastName,
          "Apellido Materno": j.strMotherLastName,
          //  "correo": j.strEmail,
          "Especialidades": JSON.stringify(espe)
        };

        console.log(espe)
      await  users.push(element);
        espe = [];

      }
      console.log(users);

     await this._excelService.exportAsExcelFile(users, `${this.title}`);
    }

  }

  //Otro componente y aui puse todo lo del otro componente

  saveUser(form: NgForm) {

  }

  getUsuario(idUsuario: string) {
    console.log(idUsuario);
    this.claveUsuario = idUsuario;
    this.userService.getUsuariosByid(idUsuario).then((data: any) => {


      console.log('suario seleccionado');
      console.log(data.cnt[0]['strName']);
      console.log(data.cnt[0]['arrEspecialidadPermiso']);
      this.name = data.cnt[0]['strName'];
      this.strLastName = data.cnt[0]['strLastName'];
      this.strMotherLastName = data.cnt[0]['strMotherLastName'];
      this.idUser = data.cnt[0]['_id'];
      this.arrEspecialidadPermiso = data.cnt[0]['arrEspecialidadPermiso'];
      this.role = data.cnt[0].idRole.strRole;
      this.user = data.cnt[0];
      this.status = `${data.cnt[0]['blnStatus']}`;
      console.log(this.idUser, 'el id user');
      console.log('id');
      console.log(this.role + 'sa');
      this.getCarrerasByUser();

    }).then((err) => {
      console.log(err);
    })
  }



  getUsuarios() {
    this.carreraService.getCareers().then(carr => {
      this.carreras = carr['cnt'];
      //console.log(this.carreras);
    })
    this.cargando = true;
    this.userService.getUsuarios().then((res: any) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.cargando = false;
      this.usuarios = res.cnt;
      for (const c of this.usuarios) {
        //console.log('----------------');
        let espe = [];

        console.log(c.strName);
        for (const especialidad of c.arrEspecialidadPermiso) {
          for (const carrera of this.carreras) {
            for (const especialidadC of carrera.aJsnEspecialidad) {
              for (const subcategorias of carrera.aJsnEspecialidad) {
                if (subcategorias._id == especialidad) {
                  //console.log(subcategorias.strEspecialidad);
                  espe.push(subcategorias.strEspecialidad);
                  // this.ngOnInit();
                }
              }
            }
          }
        }
        let element = [
          c.strName.replace(/\:null/gi, ':""'),
          c.strLastName.replace(/\:null/gi, ':""'),
          c.strMotherLastName.replace(/\:null/gi, ':""'),
          // c.strEmail.replace(/\:null/gi,':""'),
          espe

        ];
        console.log(element, "elemet");
        this.arrayUser.push(element);
        espe = [];
      }
    }).catch(err => {
      console.log(err);
    });
  }


  getRole(idRol: string) {
    console.log(idRol);
    this.rolesService.getRolByid(idRol).then((data: any) => {
      console.log('ESTOY AQUI');
      // this.roles = data.cnt[0].idRole.id;
      this.role = data.cnt[0]._id;
      console.log(data.cnt[0]._id + "Este es el id del Rol");
      console.log(this.roles);
      // this.role = data.cnt[0].idRole.strRole;
    }).then((err) => {
      console.log(err);
    })
  }



  getRoles() {
    this.cargando = true;
    this.rolesService.getRoles().then((res: any) => {
      console.log(res.cnt[0].strRole.IdRole);
      // this.role = data.cnt[0].idRole.strRole;
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 0);
      this.cargando = false;
      this.roles = res.cnt;
      for (const c of this.roles) {
        let element = [
          c.strRole.replace(/\:null/gi, ':""')
        ];
        this.arrayRol.push(element);
      }

    }).catch(err => {
      console.log(err);
    });
  }


  updateUsuarios(form: NgForm) {
    console.log(this.user);
    this.userService.putUsuarios(this.idUser, this.user).then(res => {
      Toast.fire({
        icon: 'success',
        title: `¡El usuario ${this.user.strName} se actualizó exitosamente!`
      });
      this.optionCancel.emit(false);


      this.user = new User();
      this.role = '';
      this.status = '';
      this.ngOnInit();

    }).catch(err => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      form.onReset();
    });
  }

  // putAsignaerEspecoalidad(){
  // this.userService.putUsuarioEspecialidad(this.claveUsuario, this.user).then(res => {
  //   Toast.fire({
  //    icon:'success',
  //    title: 'La especialidadd se ha asignado al usuario'
  //  }).catch(err => {
  //    Toast.fire({
  //      icon: 'error',
  //      title: err.error.msg
  //    })
  //  })
  //  })

  // }

  statusChange(status) {
    console.log(status, 'statuss', this.status);
    if (status == 'Activo') {
      this.user.blnStatus = true;
    } else {
      this.user.blnStatus = false;
    }
  }
  // Addspecialidad(){
  //   // console.log('OMAIGA!!!!');
  //   this.usermanagementService.putUsuarioEspecialidad(this.idUser,this.user).then(res=>{
  //     this.arrEspecialidadPermiso;

  //     console.log(res);
  //   });
  // }


}
