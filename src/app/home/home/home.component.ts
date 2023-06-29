import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/service/loan.service';
import { UserService } from 'src/app/service/user.service';
import { Loan } from 'src/app/ts/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private userSer: UserService,
    private fb: FormBuilder,
    private loanService: LoanService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
  }

  @ViewChild('approvalModal') approvalModal: any;
  button: any;
  token: any;
  logo: any;
  data: any;
  loan: any;
  runIndex: any;
  loanPackage: any;
  minMoney: number = 30000000;
  maxMoney: number = 1000000000;
  limit: number = 1000000;
  max = 2000;
  rangMoney: number = this.minMoney;
  rangMonth = 6;
  rangEnd = 0;
  payments: any;
  months = [6, 12, 18, 24, 36, 48, 60];
  rateMonth =
    {
      six: 0.042,
      tth: 0.084,
      et: 0.126,
      ttf: 0.168,
      tts: 0.252,
      fte: 0.335,
      st: 0.42
    };
  month: any;
  loanForm!: FormGroup;

  ngOnInit(): void {
    this.token = localStorage.getItem('currentUser');
    this.button = 'Hồ sơ'

    this.userSer.fakerData().subscribe(res => {
      this.data = res;
      if (this.data) {
        this.autoPlay();
      }
    });
    this.paymentDf();
    this.getLogo();
    this.getMoneyLoan();
    this.loanForm = this.fb.group({
      total_loan: ['', [Validators.required]],
      time: ['', [Validators.required]],
      recurring_payment: ['', [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.loanService.loanApproved().subscribe(res => {
      this.loanApproved();
    });
  }
  getLogo() {
    this.authService.getLogo().subscribe(res => {
      this.logo = environment.urlImg + res?.logo.logo
    });
  }
  openModal() {
    this.modalService.open(this.approvalModal);
  }

  getMoneyLoan() {
    this.loanService.getMoneyLoan().subscribe(res => {
      let data = res.loans[0];
      if (data?.type != 2) {
        this.loan = data?.total_loan || 0;
      }else {
        this.loan = 0;
      }
    });
  }

  autoPlay() {
    for (let index = 0; index <= this.max; index++) {
      setTimeout((y) => {
        this.runIndex = y;
        if (index == this.max) {
          this.autoPlay();
        }
      }, index * 100, index);
    }

  }

  redrect() {
    if (this.token) {
      this.router.navigate(['/trang-ca-nhan']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getValuerange(event: any) {
    this.rangMoney = event?.target?.value;
    this.calculator(this.rangMoney);
  }

  calculator(money: any) {
    switch (this.rangMonth) {
      case 6:
        const interest6M = (money * this.rateMonth.six) / 6;
        this.payments = money / 6 + interest6M;
        break;
      case 12:
        const interest12M = (money * this.rateMonth.tth) / 12;
        this.payments = money / 12 + interest12M;
        break;
      case 18:
        const interest18M = (money * this.rateMonth.et) / 18;
        this.payments = money / 18 + interest18M;
        break;
      case 24:
        const interest24M = (money * this.rateMonth.six) / 24;
        this.payments = money / 24 + interest24M;
        break;
      case 36:
        const interest36M = (money * this.rateMonth.tts) / 36;
        this.payments = money / 36 + interest36M;
        break;
      case 48:
        const interest48M = (money * this.rateMonth.fte) / 48;
        this.payments = money / 48 + interest48M;
        break;
      case 60:
        const interest60M = (money * this.rateMonth.st) / 60;
        this.payments = money / 60 + interest60M;
        break;
      default:
        const interestDf = (money * this.rateMonth.six) / 6;
        this.payments = money / 6 + interestDf;
        break;
    }
    this.payments = Math.round(this.payments);


  }

  getMonth(event: any) {
    this.rangMonth = event;
    this.calculator(this.rangMoney);


  }

  paymentDf() {
    const interestDf = (this.minMoney * this.rateMonth.six) / 6;
    this.payments = Math.round(this.minMoney / 6 + interestDf);
  }

  changeMoneyUp() {
    if (this.rangMoney == this.maxMoney) {
      return;
    }

    this.rangMoney = Number(this.rangMoney) + this.limit;
    this.calculator(this.rangMoney);
  }

  changeMoneyDown() {
    if (this.rangMoney == this.minMoney) {
      return;
    }

    this.rangMoney = Number(this.rangMoney) - this.limit;
    this.calculator(this.rangMoney);
  }

  storeLoanPackage() {
    if (this.token == null) {
      this.router.navigate(['/login']);
      return;
    }
    this.userSer.show(JSON.parse(this.token)?.id).subscribe(res => {
      let loan: any;
      loan = res.user;
      if (loan.status_cmnd == undefined || loan.status_bank == undefined
        || loan.status_infor == undefined || loan.status_signature == undefined) {
        this.router.navigate(['/thong-tin-cua-toi']);
      } else {
        let loan: Loan = {
          total_loan: this.rangMoney,
          time: this.rangMonth,
          recurring_payment: this.payments,
        }
        if (localStorage['loan_amount']) {
          localStorage.removeItem('loan_amount');
        }
        localStorage.setItem('loan_amount', JSON.stringify(loan));
        this.router.navigate(['khoan-vay']);
      }
    })

  }

  loanApproved() {
    this.loanService.loanApproved().subscribe(res => {
      if (res.loan.viewed == 0 && res.loan.status == 2) {
        this.loanPackage = res.loan;
        this.openModal()
      }
    })
  }
}
