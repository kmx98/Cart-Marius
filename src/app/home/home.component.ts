import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { OptionsBarComponent } from './components/options-bar/options-bar.component';
import { AdvertisementBannerComponent } from './components/advertisement-banner/advertisement-banner.component';
import { CardsViewSectionComponent } from './components/cards-view-section/cards-view-section.component';
import { FooterViewComponent } from '../shared/components/footer-view/footer-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,
            AdvertisementBannerComponent,
            OptionsBarComponent,
            CardsViewSectionComponent,
            FooterViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
