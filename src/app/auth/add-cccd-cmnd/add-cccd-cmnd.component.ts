import {DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/service/auth.service';
import {UserService} from 'src/app/service/user.service';
import {InforCccd} from 'src/app/ts/config';
import {environment} from 'src/environments/environment';
import {ImageValidator} from "../../Validate/image-validator";

@Component({
  selector: 'app-add-cccd-cmnd',
  templateUrl: './add-cccd-cmnd.component.html',
  styleUrls: ['./add-cccd-cmnd.component.css']
})
export class AddCccdCmndComponent implements OnInit {
  addCccdForm!: FormGroup;
  data: any;
  before: any;
  after: any;
  face: any;
  imageURL: string = '';
  mesage: string = '';
  item: any;
  submitted = false;
  user: any;
  currentUser: any;
  name: any;
  cccd: any;
  permanent_address: any;
  day_of_birthday: any;
  imageBf: any;
  imageAt: any;
  imageFace: any;
  disabled: boolean = false;
  file: any;

  constructor(
    private fb: FormBuilder,
    private authSer: AuthService,
    private userSer: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.addCccdForm = this.fb.group({
      name: ['', [Validators.required]],
      cccd_cmnd: ['', [Validators.required]],
      before_cccd_cmnd: ['', [Validators.required, ImageValidator.imageSizeValidator(100000),
        ImageValidator.imageExtensionValidator(['image/jpeg', 'image/png'])]],
      after_cccd_cmnd: ['', [Validators.required, ImageValidator.imageSizeValidator(100000),
        ImageValidator.imageExtensionValidator(['image/jpeg', 'image/png'])]],
      face_cccd_cmnd: ['', [Validators.required, ImageValidator.imageSizeValidator(100000),
        ImageValidator.imageExtensionValidator(['image/jpeg', 'image/png'])]],
      day_of_birthday: ['', [Validators.required]],
      permanent_address: ['', [Validators.required]],
    });
    if (localStorage['currentUser'])
      this.user = JSON.parse(localStorage['currentUser']);
    const id = parseInt(this.user.id);
    this.userSer.show(id).subscribe(res => {
      this.currentUser = res.user;
      this.name = this.currentUser.name;
      this.cccd = this.currentUser.cccd_cmnd;
      this.day_of_birthday = this.currentUser.day_of_birthday;
      this.permanent_address = this.currentUser.permanent_address;
      this.imageBf = this.currentUser.before_cccd_cmnd ? environment.urlImg + this.currentUser.before_cccd_cmnd : '';
      this.imageAt = this.currentUser.after_cccd_cmnd ? environment.urlImg + this.currentUser.after_cccd_cmnd : '';
      this.imageFace = this.currentUser.face_cccd_cmnd ? environment.urlImg + this.currentUser.face_cccd_cmnd : '';
      if (this.name) {
        this.addFormControl['name'].disable();
      }
      if (this.cccd) {
        this.addFormControl['cccd_cmnd'].disable();
      }
      if (this.permanent_address) {
        this.addFormControl['permanent_address'].disable();
      }
      if (this.day_of_birthday) {
        this.addFormControl['day_of_birthday'].disable();
      }
      if (this.currentUser.status_cmnd == 1) {
        this.disabled = true;
      }
    });
  }

  get addFormControl() {
    return this.addCccdForm.controls;
  }

  uploadBFCccd(event: any) {
    this.file = event.target.files ? event.target.files[0] : '';

    this.addCccdForm.patchValue({
      before_cccd_cmnd: this.file
    });

    this.addCccdForm.get('before_cccd_cmnd')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.before = reader.result as string;
    }
    reader.readAsDataURL(this.file);

  }

  uploadATCccd(event: any) {
    const file = event.target.files ? event.target.files[0] : '';

    this.addCccdForm.patchValue({
      after_cccd_cmnd: file
    });

    this.addCccdForm.get('after_cccd_cmnd')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.after = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  uploadFace(event: any) {
    const file = event.target.files ? event.target.files[0] : '';

    this.addCccdForm.patchValue({
      face_cccd_cmnd: file
    });

    this.addCccdForm.get('face_cccd_cmnd')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.face = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  addCccd() {
    if (this.addCccdForm.invalid) {
      this.disabled = true;
      return;
    }
    this.submitted = true;
    const dateSendingToServer = new DatePipe('en-US').transform(this.addCccdForm.value.day_of_birthday, 'yyyy/MM/dd')

    let cccd: InforCccd = {
      name: this.addCccdForm.value.name,
      cccd_cmnd: this.addCccdForm.value.cccd_cmnd,
      before_cccd_cmnd: this.addCccdForm.value.before_cccd_cmnd,
      after_cccd_cmnd: this.addCccdForm.value.after_cccd_cmnd,
      face_cccd_cmnd: this.addCccdForm.value.face_cccd_cmnd,
      day_of_birthday: dateSendingToServer,
      permanent_address: this.addCccdForm.value.permanent_address,
    }

    this.data = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.authSer.uploadCccd(cccd, this.data.id).subscribe(res => {
        this.item = res;
      }, err => {
        console.log(err);
        alert("Cập nhập thất bại");
      },
      () => {
        this.router.navigate(['/thong-tin-cua-toi']);
      });

  }


}
