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
export class HomeComponent implements OnInit{

  products: jewelleryType[] = [];
  GR22!:number;
  GR24!:number;
  GR18!:number;
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
  }
  ngOnInit(): void {
    this.animate();
  }
  animate(){
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hover_img',{
      rotateX: 360,
      animationIterationCount: Infinity      
    })
  }
}