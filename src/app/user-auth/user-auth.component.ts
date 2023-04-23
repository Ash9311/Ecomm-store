import { Component, OnInit } from '@angular/core';
import { SignUp, login } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean = true;

  constructor(private user:UserService) { }

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
  }

  openSignUp(){
    this.showLogin = false;
  }

  openLogin(){
    this.showLogin = true;
  }
}
