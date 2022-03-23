import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonServices } from '../services/common.services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [CommonServices]
})
export class AccountComponent implements OnInit {
  loanType:any=[];
  bankNames:any=[];
  banksByLoanType:boolean=false;
  constructor(private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getLoanType();
  }

  getLoanType() {
    const data = {
      userName: localStorage.getItem('user'),
    };
    this.commonServices.getLoanType(data).subscribe(
      res => {
        if (res.status === 'success') {
          localStorage.setItem('user', res.userName)
          this.loanType = res.loanType;
        }
      },
      _err => {
        // console.log(err);
        // this.message = "User Name does not exist";
        // this.CommonServices.showError('User Name does not exists', 'Not Found');
      }
    );
  }

  getBankNames(item) {
    this.banksByLoanType =true;
    this.bankNames = item.names
  }

  openKYC() {
    this.router.navigate(['/kyc']);
  }

}
