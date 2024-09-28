import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { jewelleryType } from '../../../shared/models/productType';
import { ProductsService } from '../../../services/products.service';
import { Observable } from 'rxjs';
import { PageNotFoundComponent } from "../../partials/page-not-found/page-not-found.component";
@Component({
  selector: 'app-diamond-jewels',
  standalone: true,
  imports: [PageNotFoundComponent, CommonModule, RouterLink],
  templateUrl: './diamond-jewels.component.html',
  styleUrl: './diamond-jewels.component.css'
})
export class DiamondJewelsComponent {
  products: jewelleryType[] = [];
  SR!:number;

  constructor(private service: ProductsService, private actRoute: ActivatedRoute) {
    actRoute.params.subscribe((params) => {
      let productsObservable: Observable<jewelleryType[]>;
      if (params.searchTerm) {
        productsObservable = this.service.getProductsBySearchTerm(params.searchTerm);
      }else if(params.metalTypeName){
        productsObservable = this.service.getProductsByMetalType(params.metalTypeName);
      }else if(params.categoryName){
        productsObservable = this.service.getProductsByCategory(params.categoryName);
      } else {
        productsObservable = this.service.getAllProducts();
      }

      productsObservable.subscribe((Products) => {
        this.products = Products;
      })

      if(typeof localStorage!== 'undefined'){
        const goldrate = localStorage.getItem('goldRate');
        const silverrate = localStorage.getItem('silverRate');

        if(silverrate){
          this.SR = JSON.parse(silverrate);
        }
      }
    })
  }
}
