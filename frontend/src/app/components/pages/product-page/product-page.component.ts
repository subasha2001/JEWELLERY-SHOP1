import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { jewelleryType } from '../../../shared/models/productType';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent{
  GR!: number;
  SR!: number;
  gst!:number;
  makingcost!: number;
  product!: jewelleryType;
  
  constructor(
    actRoute: ActivatedRoute,
    service: ProductsService,
    private cartService:CartService,
    private router:Router
  ) {
    actRoute.params.subscribe((params) => {
      if (params.id) {
        service.getProductById(params.id).subscribe(Product => {
          this.product = Product;
        })
      }
    })

    if (typeof localStorage !== 'undefined') {
      const goldrate = localStorage.getItem('goldRate');
      const silverrate = localStorage.getItem('silverRate');
      const gst = localStorage.getItem('gst');

      if (goldrate) {
        this.GR = JSON.parse(goldrate);
      }

      if (silverrate) {
        this.SR = JSON.parse(silverrate);
      }

      if (gst) {
        this.gst = JSON.parse(gst)/100;
      }
    }
  }
  
  addToCart() {
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart');
  }

  closeClass:boolean = false;
  close(val:boolean){
    this.closeClass = val;
  }

  ImgDisHov:string = '';
  showImg(val:string){
    this.ImgDisHov = val
  }
}

