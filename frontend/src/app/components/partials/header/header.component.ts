import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { jewelleryType } from '../../../shared/models/productType';
import { SearchComponent } from "../search/search.component";
import { Category } from '../../../shared/models/categories';
import { CommonModule } from '@angular/common';
import { metalType } from '../../../shared/models/metalType';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SearchComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  products!:jewelleryType[];
  metalType?:metalType[];
  categories?:Category[];
  goldRate22!:string | null;
  goldRate24!:string | null;
  goldRate18!:string | null;
  user!:User;
  silverRate!:string | null;
  cartQuantity!:number;

  constructor(service:ProductsService, private userService:UserService, cartservice:CartService){
    service.getAllProducts().subscribe((Products)=>{
      this.products = Products;
    })

    service.getAllMetalType().subscribe((serverMetalType)=>{
      this.metalType = serverMetalType;
    })

    service.getAllCategory().subscribe((serveCategories)=>{
      this.categories = serveCategories;
    })

    if(typeof localStorage!== 'undefined'){
      const goldrate22 = localStorage.getItem('goldRate22');
      const goldrate18 = localStorage.getItem('goldRate18');
      const goldrate24 = localStorage.getItem('goldRate24');
      const silverrate = localStorage.getItem('silverRate');

      if(goldrate22){this.goldRate22 = JSON.parse(goldrate22)};
      if(goldrate18){this.goldRate18 = JSON.parse(goldrate18)};
      if(goldrate24){this.goldRate24 = JSON.parse(goldrate24)};

      if(silverrate){
        this.silverRate = JSON.parse(silverrate);
      }
    }    

    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })

    cartservice.getCartObservable().subscribe((newCart =>{
      this.cartQuantity = newCart.totalCount; 
    }))
  }
  logout(){
    this.userService.logout();
  }
  get isAuth(){
    return this.user.name;
  }
}