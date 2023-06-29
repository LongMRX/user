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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  submitted = false;
  public userSubject!: BehaviorSubject<User>;
  public _userManager: any;
  public user!: Observable<User>;
  data: any;
  errors: any;
  show: boolean = false;
  type: string = 'password';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSer: AuthService,
    private authState: AuthStateService,
    private token: TokenService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    // this.userSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem('currentUser') || '{}')
    // );
    // this.user = this.userSubject.asObservable();
    // console.log(this.user);

  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;

    let data: Register = {
      phone: this.loginForm.value?.phone,
      password: this.loginForm.value.password,
    }
    this.authSer.login(data).subscribe(res => {
        this.data = res;
        this.responseHandler(this.data);
        let user: User = {
          id: this.data.user.id,
          phone: this.data.user?.phone,
          role_id: this.data.user.role_id,
          token: this.data.access_token,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      (error) => {
        this.errors = error.error;
        if (this.errors.error?.phone) {
          this.toastr.error(this.errors.error?.phone);
        } else if (this.errors.error.password) {
          this.toastr.error(this.errors.error.password);
        } else {
          this.toastr.error(this.errors.error);
        }
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['home']);
      });
  }

  responseHandler(data: any) {
    this.token.handleData(data.access_token);
  }

  showPassword() {
    if (this.show == false) {
      this.type = 'text';
      this.show = true;
    } else {
      this.type = 'password';
      this.show = false;
    }
  }
}
