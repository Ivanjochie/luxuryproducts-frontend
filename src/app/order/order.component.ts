import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  orders: any[];

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
      this.authService.$userIsLoggedIn.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.loadOrderHistory();
        } else {
          console.log("bye");
        }
      })
  }

  public loadOrderHistory(): void{
    this.orderService.getOrderHistory().subscribe(
      (orderHistory) => {
        this.orders = orderHistory;
      },
      (error) => {
        console.error('Error fetching order history', error);
      }
    )
  }
  }


