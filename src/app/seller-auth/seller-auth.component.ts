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
  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  login(data:SignUp):void{
    console.log(data);
    
   // this.seller.userSignUp(data)
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
