import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/cartItems';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';
// import { PageNotFoundComponent } from '../../partials/page-not-found/page-not-found.component';


@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, RouterModule, TitleComponent, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  cart!: Cart;
  goldRate!: number;
  silverRate!: number;

  constructor(private cartservice: CartService) {
    cartservice.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })

    if (typeof localStorage !== 'undefined') {
      const goldrate = localStorage.getItem('goldRate');
      const silverrate = localStorage.getItem('silverRate');

      if (goldrate) {
        this.goldRate = JSON.parse(goldrate);
      }

      if (silverrate) {
        this.silverRate = JSON.parse(silverrate);
      }
    }
  }

  removeFromCart(cartItem:CartItem){        
    this.cartservice.removeFromCart(cartItem.product.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartservice.changeQuanity(cartItem.product.id, quantity);
  }
}