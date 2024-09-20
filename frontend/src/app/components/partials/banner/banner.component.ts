import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { bannerType } from '../../../shared/models/bannerType';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class ImageSliderComponent implements OnInit{
  ngOnInit(): void {
    if(this.autoSlide){
      // this.autoSlideImages();
    }
  }
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  selectedIndex = 0;

  @Input() banneritems:bannerType[] = [];

  showPrev(){
    if(this.selectedIndex === 0){
      this.selectedIndex = this.banneritems.length - 1;
    }else{
      this.selectedIndex--;
    }
  }
  showNext(){
    if(this.selectedIndex === this.banneritems.length - 1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex++;
    }
  }
  selectImage(i:number):void{
    this.selectedIndex = i;
  }

  // autoSlideImages(){
  //   setInterval(()=>{
  //     this.showNext();
  //   }, this.slideInterval);
  // }
}
