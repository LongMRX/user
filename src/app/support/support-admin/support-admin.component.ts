import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-support-admin',
  templateUrl: './support-admin.component.html',
  styleUrls: ['./support-admin.component.css']
})
export class SupportAdminComponent implements OnInit {
  @Input() users: any;
  @Input() show: boolean = false;
  @Output() backEmit = new EventEmitter<boolean>();
  messages: any;
  user: any;
  // show: boolean = false;
  constructor(private chatService: ChatService,
              private location: Location
  ) { }

  ngOnInit(): void {
  }
  readMessage(id: number) {
    this.chatService.readMessage(id).subscribe(res => {
      this.messages = res.message;
      this.user = res.user;
      this.show = true;
      this.backEmit.emit(this.show);
    })
  }
  deleteAll(userId: any) {
    if (userId == null){
      return false;
    }
    this.chatService.deleteAll(userId).subscribe(res => {
      this.getUser();
    })
  }
  getUser() {
    this.chatService.getMessage().subscribe(res => {
      this.users = res.users;
    })
  }
}
