import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SignaturePad from 'signature_pad';
import { DomSanitizer } from '@angular/platform-browser';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit, AfterViewInit {
  signPad: any;
  @ViewChild('mySigCanvas', {static: false}) signaturePadElement:any;
  signImage:any;
  data:any;
  user:any;
  notData:boolean = false;
  currentUser:any;
  constructor(private _sanitizer: DomSanitizer,
              private fb: FormBuilder,
              private userSer: UserService,
              private router: Router,) { }

  ngOnInit(): void {
    if (localStorage['currentUser'])
      this.user = JSON.parse(localStorage['currentUser']);
    const id = parseInt(this.user.id);
    this.userSer.show(id).subscribe(res => {
      this.currentUser = res.user;
      this.signImage = this.currentUser.signature ?  environment.urlImg + this.currentUser.signature : '';
    });
  }
  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  startSignPadDrawing(event: Event) {
    console.log(event);
  }
  /*It's work in devices*/
  movedFinger(event: Event) {
  }
  /*Undo last step from the signature*/
  undoSign() {
    const data = this.signPad.toData();
    if (data) {
      data.pop(); // remove the last step
      this.signPad.fromData(data);
    }
  }
  /*Clean whole the signature*/
  clearSignPad() {
    this.signPad.clear();
  }
  /*Here you can save the signature as a Image*/
  saveSignPad() {
    if (this.signPad._data.length == 0){
      alert('Vui lòng nhập chữ ký!');
      return;
    }

    const base64ImageData = this.signPad.toDataURL();
    let data = {
      signature: base64ImageData,
    }

    this.data = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userSer.uploadSignature(data, this.data.id).subscribe(res => {
      }, err => {
        console.log(err);
        alert("Cập nhập thất bại");
      },
      () => {
        this.router.navigate(['/thong-tin-cua-toi']);
      });
  }
}
