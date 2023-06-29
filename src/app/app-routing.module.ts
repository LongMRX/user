import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { MyInforComponent } from './auth/my-infor/my-infor.component';
import { MyProfileComponent } from './auth/my-profile/my-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard ';
import { AuthGuard_1 } from './auth/auth.guard _1';
import { AddCccdCmndComponent } from './auth/add-cccd-cmnd/add-cccd-cmnd.component';
import { SupportIndexComponent } from './support/support-index/support-index.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoanAmonutComponent } from './loan/loan-amonut/loan-amonut.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { AuthGuard_loan } from './auth/auth.guard _loan';
import {MyLoanComponent} from "./loan/my-loan/my-loan.component";
import {MyPayComponent} from "./loan/my-pay/my-pay.component";
import {ChangePasswordComponent} from "./auth/change-password/change-password.component";
import {AddMyProfileComponent} from "./auth/my-profile/add-my-profile/add-my-profile.component";
import {AddMyBankComponent} from "./auth/my-profile/add-my-bank/add-my-bank.component";
import {SignatureComponent} from "./auth/my-profile/signature/signature.component";
import {AdditionalInforComponent} from "./auth/my-profile/additional-infor/additional-infor.component";
import {ForgetPasswordComponent} from "./auth/forget-password/forget-password.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'register', component: RegisterComponent,
    canActivate: [AuthGuard_1]
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [AuthGuard_1]
  },
  {
    path: 'thong-tin-cua-toi', component: MyInforComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trang-ca-nhan', component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home', component: HomeComponent,
  },
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  {
    path: 'cccd-cmnd', component: AddCccdCmndComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'support', component: SupportIndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vi-tien', component: WalletComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'khoan-vay', component: LoanAmonutComponent,
    canActivate: [AuthGuard_loan]
  },
  {
    path: 'chi-tiet-khoan-vay', component: LoanDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'khoan-vay-cua-toi', component: MyLoanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tra-no-cua-toi', component: MyPayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'thay-doi-mat-khau', component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'them-thong-tin-ca-nhan', component: AddMyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ngan-hang', component: AddMyBankComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chu-ky', component: SignatureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'thong-tin-bo-sung', component: AdditionalInforComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quen-mat-khau', component: ForgetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
