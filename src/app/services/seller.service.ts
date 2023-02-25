import { SignUp, login } from './../data-type';
import { EventEmitter, Injectable } from '@angular/core';
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
  isLoginError = new EventEmitter<boolean>(false)

  userSignUp(data:SignUp){
    console.log("service call");
    this.http.post('http://localhost:3000/seller',data
    ,{observe: 'response'}
    ).subscribe((result)=> {
    //  this.isSellerLoggedIn.next(true);
      if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home']) //local storage can only be stored in strings not as objects
     
      }
    })
  }

  userLogin(data:login){
  //  console.log(data);
    //api call code will be there
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`
    ,{observe: 'response'}).subscribe((result:any)=>{
       console.log(result);
      if(result && result.body && result.body.length){
        console.log("user logged in");
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home']) //local storage can only be stored in strings not as objects
      }
      else{
        console.log("login failed");
        this.isLoginError.emit(true);
      }
    })
    
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']) 
    }
  }
}
