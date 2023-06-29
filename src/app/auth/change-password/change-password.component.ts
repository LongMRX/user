import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepasswordForm !: FormGroup;
  data: any;
  errors: any;
  show: boolean = false;
  submitted: boolean = false;
  typeOld: string = 'password';
  typeNew: string = 'password';
  typeConf: string = 'password';
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.changepasswordForm = this.fb.group({
      current_password: ['', [Validators.required, Validators.minLength(8)]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  changePassword() {
    if (this.changepasswordForm.invalid) {
      return;
    }
    this.submitted = true;
    const confirmPassword = this.changepasswordForm.value.confirm_password;
    const newPassword = this.changepasswordForm.value.new_password;

    if (newPassword != confirmPassword) {
      this.toastr.error('Nhập lại mật khẩu mới không khớp với mật khẩu mới');
      return;
    }
    const data = {
      current_password: this.changepasswordForm.value.current_password,
      new_password: newPassword
    }
    this.authService.changePassword(data).subscribe(res => {
        this.toastr.success(res.message);
    },(error) => {
      this.errors = error.error;
        this.toastr.error(this.errors.message);
        return;
    },
    () => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
  get changePasswordFormControl() {
    return this.changepasswordForm.controls;
  }
  showPasswordOld() {
    if (this.show == false) {
      this.typeOld = 'text';
      this.show = true;
    } else {
      this.typeOld = 'password';
      this.show = false;
    }
  }
  showPasswordNew() {
    if (this.show == false) {
      this.typeNew = 'text';
      this.show = true;
    } else {
      this.typeNew = 'password';
      this.show = false;
    }
  }
  showPasswordConf(){
    if (this.show == false) {
      this.typeConf = 'text';
      this.show = true;
    } else {
      this.typeConf = 'password';
      this.show = false;
    }
  }
}
