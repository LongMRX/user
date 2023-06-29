import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseSevice } from 'src/app/base.component';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-infor',
  templateUrl: './my-infor.component.html',
  styleUrls: ['./my-infor.component.css']
})
export class MyInforComponent implements  OnInit {
  user: any;
  currentUser: any;
  message$!: Observable<any>;
  messageInfor$!: Observable<string>;
  meSuccess = 'Hoàn thành';
  constructor(private userSer: UserService) {

  }

  ngOnInit(): void {
    if (localStorage['currentUser'])
    this.user = JSON.parse(localStorage['currentUser']);
    const id  = parseInt(this.user.id);

    this.message$ = this.userSer.show(id);

  }

}
