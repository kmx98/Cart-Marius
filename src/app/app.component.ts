import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdvertisementBannerComponent } from './components/advertisement-banner/advertisement-banner.component';
import { OptionsBarComponent } from './components/options-bar/options-bar.component';
import { CardsViewSectionComponent } from './components/cards-view-section/cards-view-section.component';
import { FooterViewComponent } from './components/footer-view/footer-view.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
            NavbarComponent,
            AdvertisementBannerComponent,
            OptionsBarComponent,
            CardsViewSectionComponent,
            FooterViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'marius-market-app';
}
