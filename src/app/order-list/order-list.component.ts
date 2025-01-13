import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../services/order.model';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getOrders();

  }

  storeOrderId(orderId: number): void {
    // Step 1: Validate the input
    if (!orderId) {

      return;
    }


    try {
      // Step 2: Attempt to store the orderId in localStorage
      localStorage.setItem('selectedOrderId', orderId.toString());

      // Step 3: Navigate to the 'orders' page

      this.router.navigate(['/ordersid']);

    } catch (error) {
      // Step 4: Handle potential errors

    }
  }


  getOrders(): void {
    // Fetch user ID from localStorage
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.orderService.getOrdersByUser(parseInt(userId)).subscribe(
        (data: Order[]) => {
          this.orders = data;
         

        },
        (error) => {

        }
      );
    } else {

    }
  }
  goBack() {
    const previousPage = sessionStorage.getItem('previousPage');
    if (previousPage) {
      this.router.navigate(['/shine/shinehome']);
    } else {
      this.router.navigate(['/shine/shinehome']); // Fallback if no previous page is found
    }
  }
}
