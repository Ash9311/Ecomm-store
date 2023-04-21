import { product } from './../data-type';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity:number=1;
  constructor(private activeRoute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.log(result);
      this.productData = result;
    })
  }

  handleQuantity(val:string){ 
    if(this.productQuantity<20 && val=='plus'){
      this.productQuantity++;
    }
    else if(this.productQuantity>1 && val=='minus'){
      this.productQuantity--;
    }
  }

}
