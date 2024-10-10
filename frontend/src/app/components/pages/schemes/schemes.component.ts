import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-schemes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schemes.component.html',
  styleUrl: './schemes.component.css'
})
export class SchemesComponent implements OnInit{
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.animate();
  }
  scheme1: boolean = true;
  scheme2: boolean = false;
  scheme11() {
    this.scheme1 = true;
    this.scheme2 = false
  }
  scheme12() {
    this.scheme2 = true;
    this.scheme1 = false;
  }
  animate(){
     
    gsap.to(".head1",{
      scrollTrigger: "head1", 
      x: 0, 
      duration: 1,
      ease: "power2.inOut"
    });
    gsap.to('.head3',{
      scrollTrigger: ".head3", 
      x: 0, 
      duration: 1, 
      ease: "power2.inOut"
    });
    gsap.from('h3',{scrollTrigger: "h3", y: 300, opacity:0, duration: 1, ease: "power2.inOut"});
    gsap.from('.underline',{
      scrollTrigger: ".underline",
      y: 300, 
      opacity:0, 
      duration: 1, 
      ease: "power2.inOut"
    });
  }
}