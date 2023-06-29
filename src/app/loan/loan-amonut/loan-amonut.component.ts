import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-loan-amonut',
  templateUrl: './loan-amonut.component.html',
  styleUrls: ['./loan-amonut.component.css']
})
export class LoanAmonutComponent implements OnInit {
  loan: any = [];
  data: any;
  user: any;
  currentUser: any;
  loan$!: Observable<any>;
  constructor(
    private userSer: UserService,
    private router: Router,
    private loanService: LoanService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.loan = JSON.parse(localStorage['loan_amount'])
    this.currentUser = JSON.parse(localStorage['currentUser']);
    const userId = this.currentUser.id;

    this.loan$ = this.loanService.getMoneyLoan();
  }
  handleLoan() {
    this.userSer.storeLoan(this.loan).subscribe(res => {
      this.data = res;
      console.log(this.data)
      if (this.data.message = 'success') {
        localStorage.setItem('loan_amount', JSON.stringify(this.data.loans));
      }
    }, err => {
        this.toastr.error(err.error.message);
        return;
      },
      () => {
        this.router.navigate(['/chi-tiet-khoan-vay']);
      });

  }

}
