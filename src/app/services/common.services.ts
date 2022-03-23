import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class CommonServices {
  constructor(
    private httpClient: HttpClient) { }

  private urlLogin = 'http://codeusr1.instor.in:8088/aurigraph/smartContract/user/login';
  private urlsignup = 'http://codeusr1.instor.in:8088/aurigraph/smartContract/user/registration';
  private urlverifyotp = 'http://codeusr1.instor.in:8088/aurigraph/smartContract/user/registration/verifyotp';
  private urlLoanType = 'http://codeusr1.instor.in:8088/aurigraph/smartContract/fiudetails';
  private urlkycDetails= "http://codeusr1.instor.in:8088/aurigraph/smartContract/userFIUInputDetails";
  private urlApplicantDetails = "http://codeusr1.instor.in:8088/aurigraph/smartContract/fiuApplicantDetails"
 private urlverifyStatus = "http://codeusr1.instor.in:8088/aurigraph/smartContract/userFIUInputDetailsVerify"
  login(obj) {
    return this.httpClient
      .post<any>(`${this.urlLogin}`, obj);
  }

  signup(obj) {
    return this.httpClient
      .post<any>(`${this.urlsignup}`, obj);
  }

  verifyOTP(obj) {
    return this.httpClient
      .post<any>(`${this.urlverifyotp}`, obj);
  }

  getLoanType(obj) {
    return this.httpClient
      .post<any>(`${this.urlLoanType}`, obj);
  }

  postKYC(obj) {
    return this.httpClient
    .post<any>(`${this.urlkycDetails}`, obj);
  }

  getApplicantDetails(obj) {
    return this.httpClient
    .post<any>(`${this.urlApplicantDetails}`, obj);
  }

  verifyStatus(obj) {
    return this.httpClient
    .post<any>(`${this.urlverifyStatus}`, obj);
  }
}