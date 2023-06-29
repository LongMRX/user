import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) {}

  show(): Observable<any>{
    return this.http.get(environment.url + 'loan-show');
  }
  loanApproved(): Observable<any>{
    return this.http.get(environment.url + 'loan-approved');
  }
  viewed(): Observable<any>{
    return this.http.get(environment.url + 'viewed');
  }
  getMoneyLoan(): Observable<any> {
    return this.http.get(environment.url + 'get-money-loan')
  }
  handleWithdrawl(id: any): Observable<any> {
    return this.http.get(environment.url + 'handle-withdrawl/' + id)
  }
  getInforPay() {
    return this.http.get(environment.url + 'get-infor-pay');
  }
  paymentStore(data: any): Observable<any>{
    let formData = new FormData();
    formData.append('note', data.note);
    formData.append('proof', data.proof);
    formData.append('loan_id', data.loan_id);
    return this.http.post(environment.url + 'payment-store', formData)
  }
  getPayment() : Observable<any>{
    return this.http.get(environment.url + 'get-payment');
  }
}
