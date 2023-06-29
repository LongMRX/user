import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-my-bank',
  templateUrl: './add-my-bank.component.html',
  styleUrls: ['./add-my-bank.component.css']
})
export class AddMyBankComponent implements OnInit {
  addForm!: FormGroup;
  user: any;
  currentUser: any;
  data: any;
  disabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    private userSer: UserService,
    private router: Router,
    private toastr: ToastrService,

  ) {
  }

  ngOnInit(): void {
    if (localStorage['currentUser']) {
      this.user = JSON.parse(localStorage['currentUser']);
      this.getMyBank();
    }

    this.initializeAddForm();
  }
  initializeAddForm() {
    this.addForm = this.fb.group({
      account_name: ['', [Validators.required]],
      bank: ['', [Validators.required]],
      number_bank: ['', [Validators.required]],
    });
  }
  getMyBank() {
    this.userSer.show(this.user.id).subscribe(res => {
      this.currentUser = res.user;
      if (this.currentUser.status_bank == null) {
        return;
      }
      let data = {
        account_name: this.currentUser.account_name ,
        bank: this.currentUser.bank ,
        number_bank: this.currentUser.number_bank,
      }
      this.addForm.patchValue(data);
      if (this.currentUser.status_infor == 1) {
        this.addForm.disable();
        this.disabled = true;
      }
    });
  }
  get addFormControl() {
    return this.addForm.controls;
  }
  saveMybank() {
    if (this.addForm.invalid) {
      return;
    }
    let form = this.addForm.value;
    let data = {
      account_name: form.account_name,
      bank: form.bank,
      number_bank: form.number_bank,
    }
    this.userSer.storeBank(data, this.user.id).subscribe(res => {
      this.data = res;
    }, err => {
      this.toastr.error('Cập nhập thất bại');
      return;
    },
      () => {
        this.router.navigate(['/thong-tin-cua-toi']);
      });
  }
}
