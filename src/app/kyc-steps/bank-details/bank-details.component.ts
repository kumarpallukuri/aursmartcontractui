import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { PrimeNGConfig, MessageService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonServices } from '../../services/common.services';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css'],
  providers: [CommonServices]
})
export class BankDetailsComponent implements OnInit {
  form: FormGroup;
  @Output() activeIndexChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() getBankDetails: EventEmitter<any> = new EventEmitter<any>();
  bankInfo: any={}

  constructor(private fb: FormBuilder,
    private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      ifsc_Code: ['', Validators.required],

      });
  }
  get f() { return this.form.controls; }
  prevPage() {
    this.activeIndexChanged.emit(1);
  }

  nextPage(stepNext: boolean) {
    this.bankInfo = {
      'name' : this.f.name.value,
      'email' : this.f.email.value,
      'mobile_number' : this.f.mobileNumber.value,
      'account_number' : this.f.accountType.value,
      'ifsc_code' : this.f.ifsc_Code.value,
    }

  if(stepNext) {
    this.getBankDetails.emit(this.bankInfo)
    this.activeIndexChanged.emit(3);
  }
  }
}
