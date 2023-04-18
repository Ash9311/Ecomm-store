import { product } from './../data-type';
import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchResult:undefined | product[];
  constructor(private activateRoute:ActivatedRoute,private product:ProductService) { }

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query'); //query bcoz its defined in routing for search
    query && this.product.searchProducts(query).subscribe((result)=>{
      this.searchResult = result;
    })
  }

}
