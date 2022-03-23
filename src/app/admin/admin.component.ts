import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { PrimeNGConfig, MessageService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonServices } from './../services/common.services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CommonServices]
})
export class AdminComponent implements OnInit {
  applicantDetails: any=[];

  constructor(
    private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.getApplicantDetails();
  }

  getApplicantDetails() {
    const data = {
	"fiuName":"AxisBank"
  }
  this.commonServices.getApplicantDetails(data).subscribe(
    res => {
      if (res.status === 'success') {
        this.applicantDetails = res.applicatDetails;
      }else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Load'});
      }
    },
    _err => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Load'});
    }
  );
  }

  checkVerifyStatus(app) {
    localStorage.setItem('slectedUser', app.applicantName);
    localStorage.setItem('appStatus', app.verificationStatus);
    this.router.navigate(['/verifystatus']);
  }

}
