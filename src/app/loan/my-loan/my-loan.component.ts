import { Component, OnInit } from '@angular/core';
import {LoanService} from "../../service/loan.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-loan',
  templateUrl: './my-loan.component.html',
  styleUrls: ['./my-loan.component.css']
})
export class MyLoanComponent implements OnInit {
  data: any;
  loan$!: Observable<any>;

  constructor(private loanSer: LoanService,) { }

  ngOnInit(): void {
    this.getInforpay();
    this.getMoneyLoan();
  }
  getInforpay() {
    this.loanSer.getInforPay().subscribe(res => {
      this.data = res;
    })
  }
  getMoneyLoan() {
    this.loan$ = this.loanSer.getMoneyLoan();
  }

}
