import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-additional-infor',
  templateUrl: './additional-infor.component.html',
  styleUrls: ['./additional-infor.component.css']
})
export class AdditionalInforComponent implements OnInit {
  additionalForm!: FormGroup;
  user: any;
  file:any;
  image:any;
  currentUser:any;
  data:any;
  additionalImage:any;
  disabled:boolean = false;

  constructor(
    private fb: FormBuilder,
    private userSer: UserService,
    private router: Router,) { }

  ngOnInit(): void {
    this.additionalForm = this.fb.group({
      additional_information: ['', [Validators.required]],
    });
    if (localStorage['currentUser'])
      this.user = JSON.parse(localStorage['currentUser']);
      const id = parseInt(this.user.id);
      this.userSer.show(id).subscribe(res => {
        this.currentUser = res.user;
        this.additionalImage = this.currentUser.additional_information ?  environment.urlImg + this.currentUser.additional_information : '';
      });
  }
  upload(event: any) {
    this.file = event.target.files ? event.target.files[0] : '';

    this.additionalForm.patchValue({
      additional_information: this.file
    });

    this.additionalForm.get('additional_information')?.updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    }
    reader.readAsDataURL(this.file);

  }

  save() {
    if (this.additionalForm.invalid) {
      this.disabled = true;
      return;
    }
    let data = {
      additional_information: this.additionalForm.value.additional_information,
    }
    this.data = JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.userSer.uploadAdditional(data, this.data.id).subscribe(res => {
    }, err => {
      console.log(err);
      alert("Cập nhập thất bại");
    },
    () => {
      this.router.navigate(['/thong-tin-cua-toi']);
    });
  }
}
