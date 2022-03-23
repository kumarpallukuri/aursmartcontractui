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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CommonServices]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonServices: CommonServices,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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
      password: this.f.password.value
    };
    this.commonServices.login(data).subscribe(
      res => {
        if (res.loginStatus === 'success') {
          localStorage.setItem('user', res.userId)
          this.messageService.clear();
          this.messageService.add({severity:'success', summary:'Success', detail:'Login Successfull'});
          this.router.navigate(['/account']);
        }else{
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Login'});
        }
      },
      _err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Invalid Credentials'});
        // console.log(err);
        // this.message = "User Name does not exist";
        // this.CommonServices.showError('User Name does not exists', 'Not Found');
      }
    );
  }
}
