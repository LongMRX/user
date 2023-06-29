import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-support-user',
  templateUrl: './support-user.component.html',
  styleUrls: ['./support-user.component.css']
})
export class SupportUserComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() backEmit = new EventEmitter<boolean>();

  showChat:boolean = false;
  messages: any;
  user: any;
  data: any;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.getAppSupport();
  }
  openChat() {
    this.chatService.readMessage(this.user.id).subscribe(res => {
      this.messages = res.message;
      this.show = true;
      this.backEmit.emit(this.show);
    })
  }
  readMessage() {
    this.chatService.readMessage(this.user.id).subscribe(res => {
      this.messages = res.message;
      this.show = true;
      this.backEmit.emit(this.show);
    })
  }

  getAppSupport() {
    this.chatService.getAppSupport().subscribe(res => {
      this.data = res;
    })
  }
}
