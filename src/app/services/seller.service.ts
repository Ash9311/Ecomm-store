import { SignUp } from './../data-type';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient) { }

  userSignUp(data:SignUp){
    console.log("service call");
    return this.http.post('http://localhost:3000/seller',data)
  }
}
