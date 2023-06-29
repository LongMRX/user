import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message} from '../ts/config';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private pusher: Pusher;
  // @ts-ignore
  private channel: Pusher.Channel;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.push.key, {
      cluster: environment.push.cluster,
    });
  }

  getMessage(): Observable<any> {
    return this.http.get(environment.url + 'messages');
  }

  sendMessage(data: Message): Observable<Message[]> {
    let formData = new FormData();
    formData.append('message', data.message);
    formData.append('to_user', data.to_user);
    formData.append('photo', data?.photo);
    return this.http.post<Message[]>(environment.url + 'messages-store', formData);
  }

 readMessage(id: any): Observable<any> {
    return this.http.get(environment.url + 'messages-show/' + id);
 }

 getAppSupport() {
    return this.http.get(environment.url + 'get-app');
 }
 deleteAll(userId: any) {
  return this.http.delete(environment.url + 'messages-delete-all/' + userId);
 }
  delete(id: any) {
    return this.http.delete(environment.url + 'messages-delete/' + id);
  }
}
