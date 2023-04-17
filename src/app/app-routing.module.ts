import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AuthGuard } from './auth.guard';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },{
    path:'seller-auth',
    component: SellerAuthComponent
  },
  {
    path:'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    component:SearchComponent,
    path:'search/:query'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
