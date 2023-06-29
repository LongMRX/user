import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, first, map} from 'rxjs';
import {AuthService} from 'src/app/service/auth.service';
import {AuthStateService} from 'src/app/shared/auth-state.service';
import {TokenService} from 'src/app/shared/token.service';
import {Register, User} from 'src/app/ts/config';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  handleForm !: FormGroup;
  submitted = false;

  data: any;
  errors: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSer: AuthService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.handleForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  get handleFormControl() {
    return this.handleForm.controls;
  }

  forgetPassword() {
    if (this.handleForm.invalid) {
      return;
    }

    let data = {
      email: this.handleForm.value?.email,
    }
    this.authSer.forgetPassword(data).subscribe(res => {
        this.data = res;
      },
      (error) => {
        this.errors = error.error;
        this.toastr.error(this.errors.message);
      },
      () => {
        this.toastr.success(this.data.message);
      });
  }


}
