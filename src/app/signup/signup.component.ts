import { Component, OnInit } from '@angular/core';
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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [CommonServices]
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  registerId:any;
  signupModule: boolean = true;
  otpVerifyModule: boolean=false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form = this.fb.group({
      username: ['', Validators.required],
      adharNumber: ['', [Validators.required, Validators.maxLength(12)]]
      // password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
  }
    const data = {
      userName: this.f.username.value,
      adharCardNumber: this.f.adharNumber.value
      // password: this.f.password.value
    };
    this.commonServices.signup(data).subscribe(
      res => {
        if (res.status === 'success') {
          this.registerId= res.id;
          this.signupModule = false;
          this.otpVerifyModule =true
        }
      },
      _err => {
        this.messageService.add({severity:'error', summary:'Failed', detail:'Please Enter Valid Adhar Number'});
      }
    );
  }
}
