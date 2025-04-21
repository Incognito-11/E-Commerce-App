import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminLoginComponent } from './m-admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './m-admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './m-admin/user-crud/user-crud.component';
import { ProductComponent } from './components/product/product.component';
import { SigninSignupComponent } from './m-customer/signin-signup/signin-signup.component';
import { SellerDashboardComponent } from './m-customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './m-customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { CheckoutComponent } from './m-customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './m-shared/layouts/page-not-found/page-not-found.component';
import {
  AdminAuthGuardLogin,
  AdminAuthGuardService,
  BuyerAuthGaurdService,
  SellerAuthGaurdService,
  SellerBuyerAuthGuardLogin,
} from './m-shared/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'my-profile', component: UserProfileComponent },
  { path: 'contact-us', component: ContactUsComponent },

  //admin routing..!
  {
    path: '',
    canActivate: [AdminAuthGuardLogin],
    children: [{ path: 'admin-login', component: AdminLoginComponent }],
  },
  {
    path: '',
    canActivate: [AdminAuthGuardService],
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'admin/user', component: UserCrudComponent },
      { path: 'admin/product', component: ProductComponent },
    ],
  },
  {
    path: '',
    canActivate: [SellerBuyerAuthGuardLogin],
    children: [
      { path: 'sign-in', component: SigninSignupComponent },
      { path: 'sign-up', component: SigninSignupComponent },
    ],
  },
  {
    path: '',
    canActivate: [SellerAuthGaurdService],
    children: [
      { path: 'seller-dashboard', component: SellerDashboardComponent },
      { path: 'seller/product', component: ProductComponent },
    ],
  },
  {
    path: '',
    canActivate: [BuyerAuthGaurdService],
    children: [
      { path: 'buyer-dashboard', component: BuyerDashboardComponent },
      { path: 'checkout', component: CheckoutComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
