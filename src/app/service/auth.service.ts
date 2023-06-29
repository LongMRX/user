import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InforCccd, Register } from '../ts/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: Register): Observable<Register[]> {
    return this.http.post<Register[]>(environment.url + 'register', data);
  }
  changePassword(data: any): Observable<any> {
    return this.http.post(environment.url + 'change-password', data);
  }
  login(data: Register): Observable<Register[]> {
    return this.http.post<Register[]>(environment.url + 'login', data);
  }
  uploadCccd(data: InforCccd, id: any): Observable<InforCccd[]> {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('cccd_cmnd', data.cccd_cmnd);
    formData.append('permanent_address', data.permanent_address);
    formData.append('day_of_birthday', data.day_of_birthday);
    formData.append('before_cccd_cmnd', data.before_cccd_cmnd);
    formData.append('after_cccd_cmnd', data.after_cccd_cmnd);
    formData.append('face_cccd_cmnd', data.face_cccd_cmnd);

    return this.http.post<InforCccd[]>(environment.url + 'uploadCmnd/' + id, formData);
  }
  getLogo(): Observable<any> {
    return this.http.get(environment.url + 'get-logo');
  }
  forgetPassword(email: any): Observable<any> {
    return this.http.post(environment.url + 'forget-password', email);
  }
}
