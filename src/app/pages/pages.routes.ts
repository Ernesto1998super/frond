import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';

//Alertas Academicas Pages
import { CareerReportComponent } from './career-report/career-report.component';
import { SpecialtyReportComponent } from './specialty-report/specialty-report.component';
import { ReasonsCRDEComponent} from './reasons-crde/reasons-crde.component';


//AdminPro Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BehaviorComponent } from './behavior/behavior.component';


import { StatusReportComponent } from './status-report/status-report.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ModalityComponent } from './modality/modality.component';
import { AlertRegisterComponent } from './alert-register/alert-register.component';
import { TrackingAlertsComponent } from './tracking-alerts/tracking-alerts.component';
import { UserManagementComponent } from './user-management/user-management.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Mis Alertas' }, canActivate: [AuthGuard] },
          { path: 'career-report', component: CareerReportComponent, data: { titulo: 'Gestión de Carreras' }, canActivate: [AuthGuard] },
          { path: 'specialty-report/:id', component: SpecialtyReportComponent, data: { titulo: 'Gestión de Especialidades' }, canActivate: [AuthGuard] },
          { path: 'reasons-crde', component: ReasonsCRDEComponent, data: { titulo: 'Gestión de CRDE' }, canActivate: [AuthGuard] },
          { path: 'behavior/:id', component: BehaviorComponent, data: { titulo: 'Gestión de Condutas' }, canActivate: [AuthGuard] },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' }, canActivate: [AuthGuard]},
          { path: 'estatus-alerta', component: StatusReportComponent, data: { titulo: 'Catalogo de Estatus de Alertas' }, canActivate: [AuthGuard] },
          { path: 'registro-alerta', component: AlertRegisterComponent, data: { titulo: 'Registro de Alertas' }, canActivate: [AuthGuard] },
          { path: 'subjects', component: SubjectsComponent, data: { titulo: 'Gestión de Asignaturas' }, canActivate: [AuthGuard]},
          { path: 'modality', component: ModalityComponent, data: { titulo: 'Gestión de Modalidades' }, canActivate: [AuthGuard]},
          { path: 'Tracking-alerts/:id', component: TrackingAlertsComponent, data: { titulo: 'Seguimiento Alerta' }, canActivate: [AuthGuard]},
          { path: 'user-management', component: UserManagementComponent, data: { titulo:  'Gestion de Usuarios'  }, canActivate: [AuthGuard]},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
