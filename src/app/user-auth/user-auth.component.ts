import { cart, product } from './../data-type';
import { Component, OnInit } from '@angular/core';
import { SignUp, login } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean = true;
  authError:String="";
  constructor(private user:UserService,private product:ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  singup(data:SignUp){
    console.log(data);
    this.user.userSignUp(data);
  }

  login(data:login){
    console.log(data);
    this.user.userLogin(data)
    this.user.invaliduserAuth.subscribe((result)=>{
      console.log("apple",result);
      if(result){
        this.authError = "Please Enter valid user details"
      }
      else{
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp(){
    this.showLogin = false;
  }

  openLogin(){
    this.showLogin = true;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      

      cartDataList.forEach((product:product,index) => {
        let cartData:cart={
          ...product,
          productId:product.id,
          userId 
        };
        delete cartData.id;
        setTimeout(()=>{      
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.log("Item stored in DB");
          }
        })
      if(cartDataList.length==index+1){
        localStorage.removeItem('localCart')
      }
      },500)
  
      });
    }
    this.product.getCartList(userId)
    setTimeout(()=>{
      this.product.getCartList(userId);
    },2000);
  }
}
