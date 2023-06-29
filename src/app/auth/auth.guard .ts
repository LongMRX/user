import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {

  }
  data: any;
  canActivate(): any {

    this.data = localStorage.getItem('currentUser');

    if (this.data) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
