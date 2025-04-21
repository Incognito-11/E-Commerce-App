import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductComponent } from './components/product/product.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './m-shared/layouts/header/header.component';
import { FooterComponent } from './m-shared/layouts/footer/footer.component';
import { SigninSignupComponent } from './m-customer/signin-signup/signin-signup.component';
import { MAdminModule } from './m-admin/m-admin.module';
import { UserCrudComponent } from './m-admin/user-crud/user-crud.component';
import { BuyerDashboardComponent } from './m-customer/buyer/buyer-dashboard/buyer-dashboard.component';
import { SellerDashboardComponent } from './m-customer/seller/seller-dashboard/seller-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    ProductComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent,
    SigninSignupComponent,
    UserCrudComponent,
    BuyerDashboardComponent,
    SellerDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MAdminModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
