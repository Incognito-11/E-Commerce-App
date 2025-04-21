import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css'],
  providers: [DatePipe]
})
export class SellerDashboardComponent implements OnInit {
  order_dashboard_data: any[] = [];
  total_order: number = 0;
  last_order_date: string | null = 'N/A';

  product_dashboard_data: any[] = [];
  total_product: number = 0;
  publish_product: number = 0;
  inactive_product: number = 0;
  draft_product: number = 0;

  pending_order_percentage: number = 0;
  processed_order_percentage: number = 0;
  rejected_order_percentage: number = 0;

  constructor(private customerService: CustomerService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.sellerOrderDashboardData();
    this.sellerProductDashboardData();
  }

  sellerProductDashboard(): void {
    this.router.navigateByUrl("/seller/product");
  }

  sellerOrderDashboard(): void {
    alert("This option is only for VVIP candidates");
  }

  sellerOrderDashboardData(): void {
    this.customerService.orderDashboardData().subscribe(data => {
      this.order_dashboard_data = data ?? []; // Ensure data is not null
      this.total_order = this.order_dashboard_data.length;

      const lastOrder = this.order_dashboard_data[this.total_order - 1]?.dateTime;
      this.last_order_date = lastOrder ? this.datePipe.transform(lastOrder, 'medium') : 'N/A';

      // Calculate percentages safely
      const totalOrders = this.total_order;
      if (totalOrders > 0) {
        const pendingCount = this.order_dashboard_data.filter(order => order.status === 'pending').length;
        const processedCount = this.order_dashboard_data.filter(order => order.status === 'processed').length;
        const rejectedCount = this.order_dashboard_data.filter(order => order.status === 'rejected').length;

        this.pending_order_percentage = (pendingCount / totalOrders) * 100;
        this.processed_order_percentage = (processedCount / totalOrders) * 100;
        this.rejected_order_percentage = (rejectedCount / totalOrders) * 100;
      } else {
        this.pending_order_percentage = 0;
        this.processed_order_percentage = 0;
        this.rejected_order_percentage = 0;
      }
    }, error => {
      console.error("Error fetching order data", error);
    });
  }

  sellerProductDashboardData(): void {
    this.customerService.productDashboardData().subscribe(data => {
      this.product_dashboard_data = data ?? []; // Ensure data is not null
      this.total_product = this.product_dashboard_data.length;
      this.publish_product = this.product_dashboard_data.filter(product => product.status === 'publish').length;
      this.inactive_product = this.product_dashboard_data.filter(product => product.status === 'inactive').length;
      this.draft_product = this.product_dashboard_data.filter(product => product.status === 'draft').length;
    }, error => {
      console.error("Error fetching product data", error);
    });
  }
}
