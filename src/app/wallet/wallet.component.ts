import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../service/loan.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Enum } from '../ts/config';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],

})
export class WalletComponent implements OnInit {
  @ViewChild('withdrawMoney') withdrawMoney: any;
  token: any;
  loan$!: Observable<any>;
  user$!: Observable<any>;
  isDataLoaded: boolean = false;

  constructor(private loanService: LoanService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.getMoneyLoan();
  }

  approval(id?: any) {
    // this.modalService.open(this.withdrawMoney);
    this.loanService.handleWithdrawl(id).subscribe(res => {
      if (res.loan.type == Enum.REJECT) {
        this.toastr.error(res.message);
      } else {
        this.loan$ = this.loanService.getMoneyLoan();
        this.toastr.success(res.message);
      }

    })

  }
  getMoneyLoan() {
    this.loan$ = this.loanService.getMoneyLoan();
  }
}
