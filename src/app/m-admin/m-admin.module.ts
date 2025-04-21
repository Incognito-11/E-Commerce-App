import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [AdminDashboardComponent,AdminLoginComponent],
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
})
export class MAdminModule {}
