import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanService } from 'src/app/service/loan.service';

@Component({
  selector: 'app-model-withdraw-money',
  templateUrl: './model-withdraw-money.component.html',
  styleUrls: ['./model-withdraw-money.component.css']
})
export class ModelWithdrawMoneyComponent implements OnInit {
  @Input() money: any;
  constructor(private modalService: NgbModal,
    private loanService: LoanService) { }

    ngOnInit(): void {
    }
    handleWithdrawl(loan: any) {
      this.modalService.dismissAll();
      // this.loanService.handleWithdrawl(loan.loans[0].id).subscribe();
    }

}
