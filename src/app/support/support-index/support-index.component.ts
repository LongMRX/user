import {Component, OnInit} from '@angular/core';
import {Enum} from "../../ts/config";
import {ChatService} from "../../service/chat.service";
import {UserService} from "../../service/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-support-index',
  templateUrl: './support-index.component.html',
  styleUrls: ['./support-index.component.css']
})
export class SupportIndexComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private location: Location
  ) {
  }

  show: boolean = false;
  isAdmin: any;
  data: any = [];
  users: any = [];
  messages: any = [];
  userId: number = 0;
  user: any;
  list: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userService.show(this.user.id).subscribe(res => {
      this.list = res.user;
      if (this.list.role_id == Enum.IS_ADMIN) {
        this.getUser();
      }
    })

  }

  getUser() {
    this.chatService.getMessage().subscribe(res => {
      this.users = res.users;
    })
  }
  goBack(event: boolean) {
    this.show = event;
  }
  back() {
    this.show = false;
  }
}
