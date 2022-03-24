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
  selector: 'app-adhar',
  templateUrl: './adhar.component.html',
  styleUrls: ['./adhar.component.css'],
  providers: [CommonServices]
})
export class AdharComponent implements OnInit {
  form: FormGroup;
  @Output() activeIndexChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() getAdharDetails: EventEmitter<number> = new EventEmitter<number>();
  @Input() panNumber;
  adhardetails:any;


  constructor(private fb: FormBuilder,
    private router: Router,
    private commonServices: CommonServices,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.form = this.fb.group({
      adharNumber: ['', Validators.required]
      });
  }
  get f() { return this.form.controls; }

  prevPage() {
    this.activeIndexChanged.emit(0);
  }

    nextPage(stepNext: boolean) {
      this.adhardetails = this.f.adharNumber.value;
    if(stepNext) {
      this.getAdharDetails.emit(this.adhardetails)
      this.activeIndexChanged.emit(2);
    }
  }
}
