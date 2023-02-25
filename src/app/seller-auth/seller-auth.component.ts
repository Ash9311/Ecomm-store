import { SellerService } from './../services/seller.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService,private router:Router) { }
showLogin = false;
authError:string = "";
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  login(data:SignUp):void{
    this.authError = "";
    console.log(data);
    this.seller.userLogin(data);
   // this.seller.userSignUp(data) //subscribe handles our async data
   this.seller.isLoginError.subscribe((isError)=> {
    if(isError){
      this.authError = "Email or password is not correct"
    }
   })
  }

  openLogin(){
 this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }

  signUp(data:SignUp):void{
   // console.warn(data);
    this.seller.userSignUp(data)
    // .subscribe((result)=>{
    //   console.log(result);
    //   if(result){
    //     this.router.navigate(['seller-home'])
    //   }
      
    // });
  }

}
