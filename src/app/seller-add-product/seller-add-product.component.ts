import { product } from './../data-type';
import { ProductService } from './../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  @ViewChild('addProduct')
  addProductForm!: NgForm;
addProductMessage: string | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
  }
  submit(data:product){
   
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.addProductMessage="Product is successfully added";
        this.addProductForm.reset();
      }
      setTimeout(()=>(this.addProductMessage=undefined),3000)
    });
  }

}
