import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { jewelleryType } from '../../../shared/models/productType';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchComponent } from "../../partials/search/search.component";
import { ImageSliderComponent } from "../../partials/banner/banner.component";
import { bannerType } from '../../../shared/models/bannerType';
import { PortoSliderComponent } from "../../partials/porto-slider/porto-slider.component";
import { CategoriesComponent } from "../../partials/categories/categories.component";
import { PageNotFoundComponent } from "../../partials/page-not-found/page-not-found.component";
import { TitleComponent } from "../../partials/title/title.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent, ImageSliderComponent, PortoSliderComponent, CategoriesComponent, PageNotFoundComponent, TitleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  products: jewelleryType[] = [];
  bannerImages:bannerType[] = [];
  GR22!:number;
  GR18!:number;
  GR24!:number;
  SR!:number;
  goldMC!:number;
  silverMC!:number;
  diamondMC!:number;
  date!:Date;

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
        const goldrate22 = localStorage.getItem('goldRate22');
        const goldrate24 = localStorage.getItem('goldRate24');
        const goldrate18 = localStorage.getItem('goldRate18');
        const silverrate = localStorage.getItem('silverRate');
  
        if(goldrate22){this.GR22 = JSON.parse(goldrate22);}
        if(goldrate24){this.GR24 = JSON.parse(goldrate24);}
        if(goldrate18){this.GR18 = JSON.parse(goldrate18);}
        if(silverrate){this.SR = JSON.parse(silverrate);}
      }
    })

    actRoute.params.subscribe((params)=>{
      let bannerObservable:Observable<bannerType[]> = this.service.getBannerItems();
      bannerObservable.subscribe((Items=>{
        this.bannerImages = Items;
      }))
    })
  }
}





//images adding
//payment
//