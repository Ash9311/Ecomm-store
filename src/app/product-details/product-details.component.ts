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
  removeCart= false;
  productQuantity:number=1;
  constructor(private activeRoute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.log(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId==item.id.toString());
        if(items.length){
          this.removeCart = true;
        }
        else{
          this.removeCart = false;
        }
      }
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

  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }
    }
  }
  
  removeFromCart(productId:number){
    this.product.removeItemFromCart(productId);
    this.removeCart = false;  
  }

}
