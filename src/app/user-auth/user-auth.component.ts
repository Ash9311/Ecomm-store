import { Component, OnInit } from '@angular/core';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  singup(data:SignUp){
    console.log(data);
    
  }
}
