import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {AuthStateService} from "../shared/auth-state.service";
import {TokenService} from "../shared/token.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  show: boolean = false;
  type: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSer: AuthService,
    private authState: AuthStateService,
    private token: TokenService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
  }
  showPassword() {
    this.type = 'text';
  }
}
