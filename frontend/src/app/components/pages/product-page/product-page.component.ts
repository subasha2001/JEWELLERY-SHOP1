import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { jewelleryType } from '../../../shared/models/productType';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  goldRate!: number;
  silverRate!: number;
  makingcost!: number;
  buyNow() {

  }
  product!: jewelleryType;
  goldMakingCost!: number;
  silverMakingCost!: number;
  constructor(
    actRoute: ActivatedRoute,
    service: ProductsService
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

      if (goldrate) {
        this.goldRate = JSON.parse(goldrate);
      }

      if (silverrate) {
        this.silverRate = JSON.parse(silverrate);
      }
    }
    this.goldMakingCost = ((this.product?.makingCost/100) * this.goldRate)*this.product?.weight;
    this.silverMakingCost = ((this.product?.makingCost/100) * this.silverRate)*this.product?.weight;
  }
}

