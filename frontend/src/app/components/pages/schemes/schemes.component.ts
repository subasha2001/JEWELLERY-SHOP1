import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-schemes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schemes.component.html',
  styleUrl: './schemes.component.css'
})
export class SchemesComponent {
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
}
