import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoanService } from 'src/app/service/loan.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {
  loan: any;
  data: any;
  currentUser: any;
  user$!: Observable<any>;
  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.user$ = this.loanService.getMoneyLoan();

    this.loanService.show().subscribe(res => {
      this.data = res.loan;

    });
  }
  WatchContract(id:any) {
    window.location.href = environment.urlImg + 'read-contract/'+id;
  }
}
