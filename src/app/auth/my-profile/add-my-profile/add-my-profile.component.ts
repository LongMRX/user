import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';
import { Enum } from 'src/app/ts/config';

@Component({
  selector: 'app-add-my-profile',
  templateUrl: './add-my-profile.component.html',
  styleUrls: ['./add-my-profile.component.css']
})
export class AddMyProfileComponent implements OnInit {
  addForm!: FormGroup;
  currentUser: any;
  user: any;
  data: any;
  error: any;
  submitted = false;
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
      this.getMyProfile();
    }

      this.initializeAddForm();
  }
  initializeAddForm() {
    this.addForm = this.fb.group({
      academic_level: [this.currentUser ? this.currentUser.academic_level : '', [Validators.required]],
      loan_purpose: ['', [Validators.required]],
      house: [Enum.DEFAULT_VALUE, [Validators.required]],
      vehicle: ['', [Validators.required, Validators.maxLength(100)]],
      salary: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      relationship_family: [Enum.DEFAULT_VALUE, [Validators.required]],
      full_name_family: ['', [Validators.required, Validators.maxLength(50)]],
      phone_family: ['', [Validators.required, Validators.maxLength(12)]],
      relationship_other: [Enum.DEFAULT_VALUE, [Validators.required]],
      full_name_other: ['', [Validators.required, Validators.maxLength(50)]],
      phone_other: ['', [Validators.required, Validators.maxLength(12)]],
    });
  }
  get addFormControl() {
    return this.addForm.controls;
  }
  getMyProfile() {
    this.userSer.show(this.user.id).subscribe(res => {
      this.currentUser = res.user;
      if (this.currentUser.status_infor == null) {
        return;
      }
      let data = {
        academic_level: this.currentUser.academic_level ,
        loan_purpose: this.currentUser.loan_purpose ,
        house: this.currentUser.house,
        vehicle: this.currentUser.vehicle ,
        salary: this.currentUser.salary ,
        address: this.currentUser.address ,
        email: this.currentUser.email ,
        relationship_family: this.currentUser.relationship_family,
        full_name_family: this.currentUser.full_name_family ,
        phone_family: this.currentUser.phone_family  ,
        relationship_other: this.currentUser.relationship_other,
        full_name_other: this.currentUser.full_name_other ,
        phone_other: this.currentUser.phone_other ,
      };
      this.addForm.patchValue(data);
      if (this.currentUser.status_infor == 1) {
        this.addForm.disable();
        this.disabled = true;
      }
    });
  }
  saveMyProfile() {
    if (this.addForm.invalid) {
      return;
    }
    let form = this.addForm.value;
    let data = {
      academic_level: form.academic_level,
      loan_purpose: form.loan_purpose,
      house: form.house,
      vehicle: form.vehicle,
      salary: form.salary,
      address: form.address,
      email: form.email,
      relationship_family: form.relationship_family,
      full_name_family: form.full_name_family,
      phone_family: form.phone_family,
      relationship_other: form.relationship_other,
      full_name_other: form.full_name_other,
      phone_other: form.phone_other,
    }

    this.userSer.storeInfor(data, this.user.id).subscribe(res => {
      this.data = res;
      console.log(res);

    }, err => {
      this.error = err.error;
        this.toastr.error(this.error.message?.email);
      return;
    },
      () => {
        this.router.navigate(['/thong-tin-cua-toi']);
      });
  }
}
