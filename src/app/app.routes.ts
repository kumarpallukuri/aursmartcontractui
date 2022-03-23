import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { KycComponent } from './kyc-steps/kyc/kyc.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyStatusComponent } from './verify-status/verify-status.component';
 
export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: AccountComponent },
  { path: 'kyc', component: KycComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'verifystatus', component: VerifyStatusComponent}
];