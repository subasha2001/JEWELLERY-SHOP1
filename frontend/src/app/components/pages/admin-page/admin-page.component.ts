import { Component, OnInit } from '@angular/core';
import { InputComponent } from "../../partials/input/input.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { jewelleryType } from '../../../shared/models/productType';
import { ProductsService } from '../../../services/products.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { bannerType } from '../../../shared/models/bannerType';

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

  constructor(
    private actRoute: ActivatedRoute,
    private service: ProductsService,
    private router: Router
  ) {
    this.actRoute.params.subscribe((params) => {
      let productsObservable: Observable<jewelleryType[]>;
      productsObservable = this.service.getAllProducts();

      productsObservable.subscribe((Products) => {
        this.products = Products;
      })
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
  }

  addBanner(data:bannerType){
    if (data) {
      this.service.addBanner(data).subscribe(_ => {
        this.router.navigateByUrl(this.returnUrl);
      });
    }
  }

  updateGoldRate(gold:string, silver:string) {
    if (gold) {
      localStorage.clear();
      localStorage.setItem('goldRate', JSON.stringify(gold));
      localStorage.setItem('silverRate', JSON.stringify(silver));
      location.reload();
    }
  }
  
  deleteProduct(id:string){
    this.service.deleteProductById(id);
    this.router.navigateByUrl(this.returnUrl);
  }
}
