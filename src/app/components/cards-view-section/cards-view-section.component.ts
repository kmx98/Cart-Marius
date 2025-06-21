import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-cards-view-section',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cards-view-section.component.html',
  styleUrl: './cards-view-section.component.css'
})
export class CardsViewSectionComponent {

}
