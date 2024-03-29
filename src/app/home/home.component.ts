import { ProductService } from './../services/product.service';
import { product } from './../data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts:undefined | product[];
  trendyProducts:undefined | product[];
	images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.popularproducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts = data;
    });
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts = data;
    }
    )
  }

}
