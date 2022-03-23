import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServices } from '../services/common.services';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  providers: [CommonServices]
})
export class VerifyOtpComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  @Input() registerId: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form = this.fb.group({
    verifyOTP: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

 onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
    const data = {
      otp: this.f.verifyOTP.value,
      id: this.registerId
    };
    this.commonServices.verifyOTP(data).subscribe(
      res => {
        if (res.status === 'success') {
          this.router.navigate(['/login']);
          this.messageService.clear();
          this.messageService.add({severity:'success', summary:'Success', detail:'Successfully Registerd'});
        }else{
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Regiter'});
        }
      },
      _err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Regiter'});
        // console.log(err);
        // this.message = "User Name does not exist";
        // this.CommonServices.showError('User Name does not exists', 'Not Found');
      }
    );
  }
}
