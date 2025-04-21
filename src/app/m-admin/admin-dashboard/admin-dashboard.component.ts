import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {

  user_dashboard_data: any;
  total_user: number = 0;
  admin_user: number = 0;
  seller_user: number = 0;
  buyer_user: number = 0;

  admin_user_percentage: number = 0;
  seller_user_percentage: number = 0;
  buyer_user_percentage: number = 0;

  //Product Details
  product_dashboard_data: any;
  total_products: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminProductDashboard();
    this.adminUserDashboardData();
  }

  userDashboard() {
    this.router.navigateByUrl('/admin/user');
  }
  productDashboard() {
    this.router.navigateByUrl('/admin/product');
  }
  adminUserDashboardData() {
    this.adminService.userDashboardData().subscribe(
      (data) => {
        this.user_dashboard_data = data;
        this.total_user = 0;
        this.admin_user = 0;
        this.seller_user = 0;
        this.buyer_user = 0;

        for (let user in this.user_dashboard_data) {
          if (this.user_dashboard_data[user].role === 'admin') {
            ++this.admin_user;
          } else if (this.user_dashboard_data[user].role === 'seller') {
            ++this.seller_user;
          } else if (this.user_dashboard_data[user].role === 'buyer') {
            ++this.buyer_user;
          }
          ++this.total_user;
        }
        this.calculateUserPercentages();
      },
      (error) => {
        console.log('My Error', error);
      }
    );
  }

  calculateUserPercentages() {
    this.admin_user_percentage = this.total_user > 0 ? (this.admin_user / this.total_user) * 100 : 0;
    this.seller_user_percentage = this.total_user > 0 ? (this.seller_user / this.total_user) * 100 : 0;
    this.buyer_user_percentage = this.total_user > 0 ? (this.buyer_user / this.total_user) * 100 : 0;
  }

  adminProductDashboard() {
    this.adminService.productDashboardData().subscribe(
      (data) => {
        this.product_dashboard_data = data;
        this.total_products = 0;
        this.publish_product = 0;
        this.inactive_product = 0;
        this.draft_product = 0;

        for (let status in this.product_dashboard_data) {
          if (this.product_dashboard_data[status].status === 'publish') {
            ++this.publish_product;
          } else if (this.product_dashboard_data[status].status === 'inactive') {
            ++this.inactive_product;
          } else if (this.product_dashboard_data[status].status === 'draft') {
            ++this.draft_product;
          }
          ++this.total_products;
        }
      },
      (error) => {
        console.log('My error', error);
      }
    );
  }
 
}
