import { Component } from '@angular/core';

@Component({
  selector: 'app-advertisement-banner',
  standalone: true,
  imports: [],
  templateUrl: './advertisement-banner.component.html',
  styleUrl: './advertisement-banner.component.css'
})
export class AdvertisementBannerComponent {

  clickCount = 0;

  increaseCounter() {
    this.clickCount += 1;
    console.log('Contador:', this.clickCount); // solo para pruebas
  }
}
