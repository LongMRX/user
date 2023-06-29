import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import {Register, User} from 'src/app/ts/config';
import { ToastrService } from 'ngx-toastr';
import {AuthStateService} from "../../shared/auth-state.service";
import {TokenService} from "../../shared/token.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  context!: CanvasRenderingContext2D;
  @ViewChild('myCanvas')
  canvas!: ElementRef;
  rightCode = '';
  showNum = [];
   canvasWinth = 150;
   canvasHeight = 30;
   registerForm !: FormGroup;
   submitted = false;
   data: any;
   errors: any;
  show: boolean = false;
  type: string = 'password';
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _Router: Router,
    private authSer: AuthService,
    private toastr: ToastrService,
    private authState: AuthStateService,
    private token: TokenService,
  ) {}

  ngAfterViewInit() {
    this.getImgValiCode();
  }

  getImgValiCode() {
    let showNum = [];
    const canvas = this.canvas.nativeElement;
    this.context = canvas.getContext( '2d' );
    canvas.width = this.canvasWinth;
    canvas.height = this.canvasHeight;
    let sCode = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9';
  let saCode = sCode.split(',');
  let saCodeLen = saCode.length;
  for (let i = 0; i <= 4; i++) {
    let sIndex = Math.floor(Math.random()*saCodeLen);
    let sDeg = (Math.random()*30*Math.PI) / 180;
    let cTxt = saCode[sIndex];
    showNum[i] = cTxt.toLowerCase();
    let x = 10 + i*20;
    let y = 20 + Math.random()*8;
    this.context.font = 'bold 23px 微软雅黑';
    this.context.translate(x, y);
    this.context.rotate(sDeg);

    this.context.fillStyle = this.randomColor();
    this.context.fillText(cTxt, 0, 0);
    this.context.rotate(-sDeg);
    this.context.translate(-x, -y);
  }
  for (let i = 0; i <= 4; i++) {
    this.context.strokeStyle = this.randomColor();
    this.context.beginPath();
    this.context.moveTo(
      Math.random() * this.canvasWinth,
      Math.random() * this.canvasHeight
    );
    this.context.lineTo(
      Math.random() * this.canvasWinth,
      Math.random() * this.canvasHeight
    );
    this.context.stroke();
  }
  for (let i = 0; i < 30; i++) {
    this.context.strokeStyle = this.randomColor();
    this.context.beginPath();
    let x = Math.random() * this.canvasWinth;
    let y = Math.random() * this.canvasHeight;
    this.context.moveTo(x,y);
    this.context.lineTo(x+1, y+1);
    this.context.stroke();
  }
  this.rightCode = showNum.join('');
    this.rightCode = this.rightCode.toUpperCase();
  }

  randomColor () {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      phone: ['', [Validators.required,Validators.minLength(8)]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      code: [''],
    })
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  register(){
    if (this.registerForm.invalid) {
      return;
    }
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    let code = this.registerForm.value.code;
    if (code !== this.rightCode) {
      this.toastr.error('Mã xác minh không đúng');
      return;
    }

    let data: Register = {
      phone: this.registerForm.value?.phone,
      password: this.registerForm.value.password,
    }

    this.authSer.register(data).subscribe(res => {
      this.data = res;
        this.responseHandler(this.data);
        let user: User = {
          id: this.data.user.id,
          phone: this.data.user?.phone,
          role_id: this.data.user.role_id,
          token: this.data.access_token,
        };
        localStorage.setItem('currentUser', JSON.stringify(user));

      },(error) => {
        this.errors = error.error;
        if (this.errors.error?.phone) {
          this.toastr.error(this.errors.error?.phone);
        }
        if (this.errors.error.password) {
          this.toastr.error(this.errors.error.password);
        }
      },
    () => {
      this.registerForm.reset();
      this.authState.setAuthState(true);
      this._Router.navigate(['/thong-tin-cua-toi']);
    }
    )
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
