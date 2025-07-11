import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { ScrollBarComponent } from '../scroll-bar/scroll-bar.component';

@Component({
  selector: 'app-cards-view-section',
  standalone: true,
  imports: [CardComponent, ScrollBarComponent],
  templateUrl: './cards-view-section.component.html',
  styleUrl: './cards-view-section.component.css'
})
export class CardsViewSectionComponent {

}
