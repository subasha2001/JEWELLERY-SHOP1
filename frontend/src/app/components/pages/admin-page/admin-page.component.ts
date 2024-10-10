import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../partials/input/input.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { jewelleryType } from '../../../shared/models/productType';
import { ProductsService } from '../../../services/products.service';
import { Observable, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { bannerType } from '../../../shared/models/bannerType';
import { log } from 'node:console';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [InputComponent, FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {
  products: jewelleryType[] = [];
  isAdded: boolean = false;
  returnUrl = '';
  bannerImg: bannerType[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private service: ProductsService,
    private router: Router,
    private http:HttpClient
  ) {
    this.actRoute.params.subscribe((params) => {
      let productsObservable: Observable<jewelleryType[]>;
      productsObservable = this.service.getAllProducts();

      productsObservable.subscribe((Products) => {
        this.products = Products;
      })
    })

    actRoute.params.subscribe((params) => {
      let bannerObservable: Observable<bannerType[]> = this.service.getBannerItems();
      bannerObservable.subscribe((Items => {
        this.bannerImg = Items;
      }))
    })
  }

  ngOnInit(): void {
    this.returnUrl = this.actRoute.snapshot.queryParams['returnUrl'];
  }

  add(data: jewelleryType) {
    if (data) {
      this.service.addProduct(data).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }
    console.log(data);
  }

  addBanner(data: bannerType) {
    if (data) {
      this.service.addBanner(data).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }
  }

  updateRate(gold22: string, gold18: string, gold24: string, silver: string, gst: string) {
    if (gold22) {
      localStorage.setItem('goldRate22', JSON.stringify(gold22));
      localStorage.setItem('goldRate18', JSON.stringify(gold18));
      localStorage.setItem('goldRate24', JSON.stringify(gold24));
      localStorage.setItem('silverRate', JSON.stringify(silver));
      localStorage.setItem('gst', JSON.stringify(gst));
      location.reload();
    }
  }

  toDelete:string = '';
  toDeleteItem(val:string){
    this.toDelete = val;
  }

  deleteProduct(id: string) {
    this.service.deleteProductById(id).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
  deleteBanner(id: string) {
    this.service.deleteBannerById(id).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  file:any;

  getImgDis(event: any) {
    this.file = event.target.files[0];
    console.log('file',this.file);
  }
  // getImgHov(event: any) {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     this.file = file;
  //   }
  // }
  onUpload() {
    let form = new FormData();
    form.set('file', this.file)

    this.http.post('http://localhost:3000/upload', form).subscribe((response)=>{})
  }
}