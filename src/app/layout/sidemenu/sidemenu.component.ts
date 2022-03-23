import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonServices } from '../../services/common.services';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  providers: [CommonServices]
})
export class SidemenuComponent implements OnInit {
  visibleSidebar1;
  
  constructor(private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
