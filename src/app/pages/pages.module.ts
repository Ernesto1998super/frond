import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilePondModule, registerPlugin } from 'ngx-filepond';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { CareerReportComponent } from './career-report/career-report.component';
import { RegisterCareerComponent } from './career-report/register-career/register-career.component';
import { UpdateCareerComponent } from './career-report/update-career/update-career.component';
import { CommonModule } from '@angular/common';
import { SpecialtyReportComponent } from './specialty-report/specialty-report.component';
import { RegisterSpecialtyComponent } from './specialty-report/register-specialty/register-specialty.component';
import { UpdateSpecialtyComponent } from './specialty-report/update-specialty/update-specialty.component';
import { ReasonsCRDEComponent } from './reasons-crde/reasons-crde.component';
import { RegisterReasonsComponent } from './reasons-crde/register-crde/register-crde.component';
import { UpdateCrdeComponent } from './reasons-crde/update-crde/update-crde.component';
import { BehaviorComponent } from './behavior/behavior.component';
import { RegisterBehaviorComponent } from './behavior/register-behavior/register-behavior.component';
import { UpdateBehaviorComponent } from './behavior/update-behavior/update-behavior.component';
import { StatusReportComponent } from './status-report/status-report.component';
import { RegisterStatusComponent } from './status-report/register-status/register-status.component';
import { UpdateStatusComponent } from './status-report/update-status/update-status.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { RegisterSubjectsComponent } from './subjects/register-subjects/register-subjects.component';
import { UpdateSubjectsComponent } from './subjects/update-subjects/update-subjects.component';
import { RegisterModalityComponent } from './modality/register-modality/register-modality.component';
import { UpdateModalityComponent } from './modality/update-modality/update-modality.component';
import { ModalityComponent } from './modality/modality.component';
import { AlertRegisterComponent } from './alert-register/alert-register.component';
import { TrackingAlertsComponent } from './tracking-alerts/tracking-alerts.component';
import { UserManagementComponent } from './user-management/user-management.component';





@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        CareerReportComponent,
        RegisterCareerComponent,
        UpdateCareerComponent,
        SpecialtyReportComponent,
        RegisterSpecialtyComponent,
        UpdateSpecialtyComponent,
        ReasonsCRDEComponent,
        RegisterReasonsComponent,
        UpdateCrdeComponent,
        BehaviorComponent,
        RegisterBehaviorComponent,
        UpdateBehaviorComponent,
        StatusReportComponent,
        RegisterStatusComponent,
        UpdateStatusComponent,
        SubjectsComponent,
        RegisterSubjectsComponent,
        UpdateSubjectsComponent,
        ModalityComponent,
        RegisterModalityComponent,
        UpdateModalityComponent,
        AlertRegisterComponent,
        TrackingAlertsComponent,
        UserManagementComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        FilePondModule
    ]
})

export class PagesModule { }
