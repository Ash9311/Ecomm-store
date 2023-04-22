import { Component, OnInit, Query } from '@angular/core';
import {Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: String='default';
  sellerName:string ='';
  searchResult: undefined | product[];
  userName: string  = "";
  constructor(private route: Router,private product:ProductService) { }
  
  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          console.log('in seller area');
          this.menuType = "seller";
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } 
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else{
          console.log('outside seller');
          this.menuType = 'default';
        }
      }
    
      
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result)=>{
        
        if(result.length>5){
        result.length=5;
        }
        this.searchResult = result;
      })
      console.log(element.value);
      
    }
  }

  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }

  redirectToDetail(id:number){
    this.route.navigate(['/details/'+id])
  }
}
