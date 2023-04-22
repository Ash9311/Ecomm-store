import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(user:SignUp){
    console.log(user);
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>{
      console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
      
    })
  }
}
