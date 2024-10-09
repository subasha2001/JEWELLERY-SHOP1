import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cartItems';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from '../../partials/page-not-found/page-not-found.component';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, RouterModule, TitleComponent, CommonModule, PageNotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  cart!: Cart;
  goldRate22!: number;
  goldRate24!: number;
  goldRate18!: number;
  silverRate!: number;

  constructor(private cartservice: CartService) {
    cartservice.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })

    if (typeof localStorage !== 'undefined') {
      const goldrate22 = localStorage.getItem('goldRate22');
      const goldrate18 = localStorage.getItem('goldRate18');
      const goldrate24 = localStorage.getItem('goldRate24');
      const silverrate = localStorage.getItem('silverRate');

      if (goldrate22) {this.goldRate22 = JSON.parse(goldrate22);}
      if (goldrate18) {this.goldRate22 = JSON.parse(goldrate18);}
      if (goldrate24) {this.goldRate22 = JSON.parse(goldrate24);}
      if (silverrate) {this.silverRate = JSON.parse(silverrate);}
    }

    console.log(this.goldRate22);
  }

  removeFromCart(cartItem:CartItem){        
    this.cartservice.removeFromCart(cartItem.product.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartservice.changeQuanity(cartItem.product.id, quantity);
  }
}