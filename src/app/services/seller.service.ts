import { SignUp } from './../data-type';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient,private router:Router) {

   }

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  userSignUp(data:SignUp){
    console.log("service call");
    this.http.post('http://localhost:3000/seller',data
    ,{observe: 'response'}
    ).subscribe((result)=> {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home']) //local storage can only be stored in strings not as objects
      console.log('result',result);
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']) 
    }
  }
}
