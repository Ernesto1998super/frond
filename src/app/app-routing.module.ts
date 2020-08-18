import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { SendEmailComponent } from './restore-password/send-email/send-email.component';
import { ChangePasswordComponent } from './restore-password/change-password/change-password.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sendemail', component: SendEmailComponent },
  { path: 'reset-password/:token', component: ChangePasswordComponent},
  { path: '**', component: NopagefoundComponent }
];

export const AppRoutingModule = RouterModule.forRoot ( routes,  { useHash: true });
