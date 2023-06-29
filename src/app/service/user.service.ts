import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Loan, Message} from '../ts/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  show(id: number): Observable<any>{
    return this.http.get(environment.url + 'user/' + id);
  }
  fakerData(): Observable<any>{
    return this.http.get(environment.url + 'data-customer');
  }
  storeLoan(data: Loan): Observable<Loan[]>{
    return this.http.post<Loan[]>(environment.url + 'loan-store', data);
  }
  getMessage(): Observable<any> {
    return this.http.get(environment.url + 'messages');
  }
  sendMessage(data: Message): Observable<Message[]> {
    return this.http.post<Message[]>(environment.url + 'messages', data);
  }
  storeInfor(data: any, id: any): Observable<any[]> {
    return this.http.post<any[]>(environment.url + 'user-store/' + id, data);
  }
  storeBank(data: any, id: any): Observable<any[]> {
    return this.http.post<any[]>(environment.url + 'user-store-bank/' + id, data);
  }
  uploadAdditional(data: any, id: any): Observable<any[]> {
    let formData = new FormData();
    formData.append('additional_information', data.additional_information);
    return this.http.post<any[]>(environment.url + 'upload-additional/' + id, formData);
  }
  uploadSignature(data: any, id: any): Observable<any[]> {
    let formData = new FormData();
    formData.append('signature', data.signature);
    return this.http.post<any[]>(environment.url + 'upload-signature/' + id, formData);
  }
}
