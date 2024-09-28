import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'order-items-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css'
})
export class OrderItemsListComponent {
  @Input()order!:Order;

  price:number = 0;
  GR!:number;
  SR!:number;
  GST!:number;

  constructor(){
    if(typeof localStorage!== 'undefined'){
      const goldrate = localStorage.getItem('goldRate');
      const silverrate = localStorage.getItem('silverRate');
      const gst = localStorage.getItem('gst');
  
      if(goldrate){
        this.GR = JSON.parse(goldrate);
      }
  
      if(silverrate){
        this.SR = JSON.parse(silverrate);
      }
  
      if(gst){
        this.GST = JSON.parse(gst);
      }
    }
  }
  
}
