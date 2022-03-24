import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { PrimeNGConfig, MessageService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonServices } from './../services/common.services';

@Component({
  selector: 'app-verify-status',
  templateUrl: './verify-status.component.html',
  styleUrls: ['./verify-status.component.css'],
  providers: [CommonServices]
})
export class VerifyStatusComponent implements OnInit {
  isPanverified: boolean;
  isAdharVerified: boolean;
  isBankDetailsVerified: boolean;
  veryStatusofApp: any;
  selectedUser: string;
  constructor( private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.verifyStatus();
  }
  verifyStatus() {
    this.selectedUser = localStorage.getItem('slectedUser'),
    this.veryStatusofApp = localStorage.getItem('appStatus')
      const data = {
        "userName": this.selectedUser,
        "verificationStatus": this.veryStatusofApp
        }
    this.commonServices.verifyStatus(data).subscribe(
      res => {
        if (res.status === 'sucesss') {
          this.isPanverified = res.isPanverified;
          this.isAdharVerified = res.isAdharVerified;
          this.isBankDetailsVerified = res.isAdharVerified;
        }else{
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Load'});
        }
      },
      _err => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Load'});
      }
    );
    }
}
