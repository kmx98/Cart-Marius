import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdvertisementBannerComponent } from './components/advertisement-banner/advertisement-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
            NavbarComponent,
            AdvertisementBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'marius-market-app';
}
