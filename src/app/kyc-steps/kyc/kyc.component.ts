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
  panNumber: any;
  adhardetails: any;
  bankDetails: any=[];
  verifiedSuccessfully: boolean;
  isPanverified: any;
  isAdharVerified: any;
  isBankDetailsVerified: any;
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
      { label: 'Bank Details'}
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
      default:
        break;
    }
  }

  showStep1Pan() {
    this.activeIndex = 0;
    this.showPanStep1= true;
    this.showAdharStep2= false;
    this.showAdharStep3= false;
    this.verifiedSuccessfully = false;
  }

  showStep2Adhar() {
    this.activeIndex = 1;
    this.showPanStep1= false;
    this.showAdharStep2= true;
    this.showAdharStep3= false;
    this.verifiedSuccessfully = false;
  }

  showStep3BankDetails() {
    this.activeIndex = 2;
    this.showPanStep1= false;
    this.showAdharStep2= false;
    this.showAdharStep3= true;
  }

  getAdharDetails(adhardetails) {
    this.adhardetails = adhardetails;
  }

  getBankDetails(bankInfo) {
const banktype = {
  "type": "link_current_account",
  "bank_name": "icici_bank",
  "bank_linking_details": {
       "corp_id": "91212012912102",
       "user_id": "01081202012"
  },
  bankInfo,
  };
  this.bankDetails.push(banktype)
  this.saveKYC();
}
  nextPage(stepNext: boolean) {
    this.panNumber = this.f.panNUmber.value;
    if(stepNext) {
      this.stepperChanged(1);
    }
  }

  saveKYC(){
    const username = localStorage.getItem('user')
    const data = {
    	"panNumber": this.panNumber,
      "userName": username,
      "bankDetails": this.bankDetails
    };
    this.commonServices.postKYC(data).subscribe(
      res => {
        if (res.status === 'sucesss') {
          this.verifiedSuccessfully = true;
          this.isPanverified = res.isPanverified;
          this.isAdharVerified = res.isAdharVerified;
          this.isBankDetailsVerified = res.isBankDetailsVerified;
          this.messageService.clear();
          this.messageService.add({severity:'success', summary:'Success', detail:'Updated Successfull'});
          // this.router.navigate(['/account']);
        }else{
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Update'});
        }
      },
      _err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Update'});
        // console.log(err);
        // this.message = "User Name does not exist";
        // this.CommonServices.showError('User Name does not exists', 'Not Found');
      }
    );
  }
}
