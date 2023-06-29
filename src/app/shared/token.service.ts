import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class TokenService {
  private issuer = {
    login: environment.url + '/login',
    register: environment.url + '/register',
  };
  constructor() {}
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      console.log(payload);

      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    const PassportPayload = token.split('.')[1];
    return PassportPayload;
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('currentUser');
  }
}
