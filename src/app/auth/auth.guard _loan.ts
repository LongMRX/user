import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard_loan implements CanActivate {
  constructor(private router: Router){

  }
  data: any;
  loan: any;
  canActivate():any{

    this.data = localStorage.getItem('currentUser') ;
    this.loan = localStorage.getItem('loan_amount') ;
    if (this.data && this.loan) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
