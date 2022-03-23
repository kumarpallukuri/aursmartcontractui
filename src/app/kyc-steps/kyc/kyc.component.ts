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
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css'],
  providers: [CommonServices]
})
export class KycComponent implements OnInit {
  activeIndex: number = 0;
  @Input() items: MenuItem[];
  form: FormGroup;
  submitted = false;
  showPanStep1:boolean;
  showAdharStep2:boolean;
  showAdharStep3:boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.showPanStep1= true;
    this.items = [
      { label: 'PAN'},
      { label: 'Aadhar' },
      { label: 'Bank Details'},
      { label: 'Review & Save'},
    ];
    this.form = this.fb.group({
      panNUmber: ['', Validators.required]
      });
  }
  get f() { return this.form.controls; }

  public stepperChanged(step: number) {
    switch (step) {
      case 0:
        this.showStep1Pan();
        break;
      case 1:
        this.showStep2Adhar();
        break;
      case 2:
        this.showStep3BankDetails();
        break;
        case 3:
        // this.showReviewDetails();
        break;
      default:
        break;
    }
  }

  showStep1Pan() {
    this.activeIndex = 0;
    this.showPanStep1= true;
    this.showAdharStep2= false;
  }

  showStep2Adhar() {
    this.activeIndex = 1;
    this.showPanStep1= false;
    this.showAdharStep2= true;
  }

  showStep3BankDetails() {
    this.activeIndex = 2;
    this.showPanStep1= false;
    this.showAdharStep2= false;
    this.showAdharStep3= true;
  }

  nextPage(stepNext: boolean) {
    if(stepNext) {
      this.stepperChanged(1);
    }
  }
}
