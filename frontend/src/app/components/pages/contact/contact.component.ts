import { Component } from '@angular/core';
import { TitleComponent } from "../../partials/title/title.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
