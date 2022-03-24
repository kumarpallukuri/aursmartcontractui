import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {StepsModule} from 'primeng/steps';
import {TableModule} from 'primeng/table';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './app.routes';
import { SignupComponent } from './signup/signup.component';
import { CommonServices } from './services/common.services';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './layout/header/header.component';
import { BaseComponent } from './layout/base/base.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DividerModule} from 'primeng/divider';
import { KycComponent } from './kyc-steps/kyc/kyc.component';
import { AdharComponent } from './kyc-steps/adhar/adhar.component';
import { AdminComponent } from './admin/admin.component';
import { VerifyStatusComponent } from './verify-status/verify-status.component';
import { BankDetailsComponent } from './kyc-steps/bank-details/bank-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerifyOtpComponent,
    SidemenuComponent,
    HeaderComponent,
    BaseComponent,
    AccountComponent,
    KycComponent,
    AdharComponent,
    BankDetailsComponent,
    AdminComponent,
    VerifyStatusComponent
  ],
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    ToastModule,
    SidebarModule,
    BrowserModule,
    OverlayPanelModule,
    DividerModule,
    StepsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)     ],
  providers: [
    CommonServices,
    ConfirmationService,
    MessageService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
