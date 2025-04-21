import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css'],
})
export class BuyerDashboardComponent implements OnInit {
  all_products: any[] = []; // Initialize as an empty array
  show_Checkout: boolean = false;

  constructor(private router: Router, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.customerService.allProduct().subscribe(
      (data) => {
        this.all_products = data;
        console.log('Fetched products:', this.all_products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  buyProduct(id: number) {
    this.show_Checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }

  addToCart() {
    alert('This is showcase');
  }
}

