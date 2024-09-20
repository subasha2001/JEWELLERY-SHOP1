import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jewelleryType } from '../shared/models/productType';
import { HttpClient } from '@angular/common/http';
import { BANNER_URL, DELETE_PRODUCT_BY_ID_URL, PRODUCTS_BY_CATEGORY_URL, PRODUCTS_BY_ID_URL, PRODUCTS_BY_METALTYPE_URL, PRODUCTS_BY_SEARCH_URL, PRODUCTS_CATEGORIES_URL, PRODUCTS_METALTYPES_URL, PRODUCTS_URL } from '../shared/models/constants/urls';
import { Category } from '../shared/models/categories';
import { bannerType } from '../shared/models/bannerType';
import { metalType } from '../shared/models/metalType';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(product: jewelleryType): Observable<jewelleryType> {
    return this.http.post<jewelleryType>(PRODUCTS_URL + '/addProduct', product).pipe(
      tap({
        next: (name) => {
          localStorage.setItem('products', JSON.stringify(name));
          alert('product added');
        },
        error: (err) => {
          alert(err);
        }
      })
    )
  }

  addBanner(data:bannerType): Observable<bannerType>{
    return this.http.post<bannerType>(BANNER_URL + '/addBanner', data).pipe(
      tap({
        next:(name) =>{
          localStorage.setItem('banner', JSON.stringify(name));
          alert('banner added');
        },
        error:(err)=>{
          alert(err);
        }
      })
    )
  }
  getBannerItems():Observable<bannerType[]>{
    return this.http.get<bannerType[]>('http://localhost:3000/api/banner');
  }
  
  todaysGoldRate = new BehaviorSubject<string>('');
  todaysGoldRate$ = this.todaysGoldRate.asObservable();
  updateGoldRate(value:string){
    this.todaysGoldRate.next(value);
  }
  
  getAllProducts(): Observable<jewelleryType[]> {
    return this.http.get<jewelleryType[]>(PRODUCTS_URL);
  }

  getProductsBySearchTerm(searchTerm:string){
    return this.http.get<jewelleryType[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }

  getAllMetalType(): Observable<metalType[]>{
    return this.http.get<metalType[]>(PRODUCTS_METALTYPES_URL);
  }

  getAllCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(PRODUCTS_CATEGORIES_URL);
  }

  getProductsByMetalType(metalTypeName: string):Observable<jewelleryType[]>{
    return metalTypeName === "All"?
      this.getAllProducts():
      this.http.get<jewelleryType[]>(PRODUCTS_BY_METALTYPE_URL + metalTypeName);
  }

  getProductsByCategory(categoryName: string):Observable<jewelleryType[]>{
    return categoryName === "All"?
      this.getAllProducts():
      this.http.get<jewelleryType[]>(PRODUCTS_BY_CATEGORY_URL + categoryName);
  }

  getProductById(productId:string):Observable<jewelleryType>{
    return this.http.get<jewelleryType>(PRODUCTS_BY_ID_URL + productId);
  }

  deleteProductById(productId:string){
    return this.http.delete(DELETE_PRODUCT_BY_ID_URL + productId);
  }
}