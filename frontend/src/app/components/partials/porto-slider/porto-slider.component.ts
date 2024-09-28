import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'porto-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './porto-slider.component.html',
  styleUrl: './porto-slider.component.css'
})
export class PortoSliderComponent{
 porto:any[] = [
  {
    img:'bestPrice',
    name:'Best Price',
    count: 1
  },
  {
    img:'bestQuality',
    name:'Best Quality',
    count: 2
  },
  {
    img:'securedShipping',
    name:'Secured Shipping',
    count: 3
  },
  {
    img:'100-refund',
    name:'100% Refund',
    count: 4
  },
  {
    img:'15DaysReturn',
    name:'15 Days Return',
    count: 5
  },
  {
    img:'lifeTimeExchange',
    name:'Life TIme Exchange',
    count: 6
  },
  {
    img:'listedCompany',
    name:'Listed Company',
    count: 7
  },
  {
    img:'50Stores',
    name:'50+ Stores',
    count: 8
  },
  {
    img:'2000Employees',
    name:'2000+ Employees',
    count: 9
  },
  {
    img:'certifiedJewellery',
    name:'Certified Jewellery',
    count: 10
  },
  {
    img:'securedRetail',
    name:'Secured Retail',
    count: 11
  }
 ]
}