import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Mis Alertas', icono: 'fa fa-exclamation-triangle', url: '/dashboard' },
        { titulo: 'Gestión de Carreras', icono: 'fa fa-graduation-cap', url: '/career-report'},
        { titulo: 'Gestión de CRDE', icono: 'fa fa-exclamation-circle', url: '/reasons-crde' },
        { titulo: 'Estatus de Alerta', icono: 'fa fa-thermometer-half', url: '/estatus-alerta'},
        { titulo: 'Registro de Alertas', icono: 'fa fa-file', url: '/registro-alerta'},
        { titulo: 'Gestión de Asignaturas', icono: 'fa fa-book', url: '/subjects' },
        { titulo: 'Gestión de Modalidades', icono: 'fa fa-sun-o', url: '/modality' },
        { titulo: 'Gestión de Usuarios', icono: 'fa fa-user-o', url: '/user-management' },
       
      ]
    }
  ];

  constructor() { }
}
