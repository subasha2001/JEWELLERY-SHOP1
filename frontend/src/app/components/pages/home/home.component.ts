import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { jewelleryType } from '../../../shared/models/productType';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../partials/search/search.component";
import { ImageSliderComponent } from "../../partials/banner/banner.component";
import { bannerType } from '../../../shared/models/bannerType';
import { PageNotFoundComponent } from "../../partials/page-not-found/page-not-found.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent, ImageSliderComponent, PageNotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: jewelleryType[] = [];
  GR!:number;
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
  
        if(goldrate){
          this.GR = JSON.parse(goldrate);
        }

        if(silverrate){
          this.SR = JSON.parse(silverrate);
        }
      }
    })
  }
}
