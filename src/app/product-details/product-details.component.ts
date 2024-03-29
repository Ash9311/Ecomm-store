import { cart, product } from './../data-type';
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
  removeCart = false;
  cartData:product|undefined;
  productQuantity: number = 1;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity++;
    }
    else if (this.productQuantity > 1 && val == 'minus') {
      this.productQuantity--;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        console.log(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId)
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId); 
    }
    else {
     
      console.log(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId)
      });
      
    }
    this.removeCart = false;
  }

}
