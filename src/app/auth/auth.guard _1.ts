import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard_1 implements CanActivate {
  constructor(private router: Router){

  }
  data: any;
  canActivate():any{

    this.data = localStorage.getItem('currentUser') ;
    if (this.data) {
        this.router.navigate(['/home']);
        return false;
    }else{
      return true;
    }
  }
}
