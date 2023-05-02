import { ProductService } from '../services/product.service';
import { order, product } from './../data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData:any;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.orderlist().subscribe((result)=>{
      this.orderData = result;
    })
  }

}
