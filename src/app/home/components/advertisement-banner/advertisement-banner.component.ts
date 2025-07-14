import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advertisement-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement-banner.component.html',
  styleUrl: './advertisement-banner.component.css'
})
export class AdvertisementBannerComponent {

  activeIndex = 0; // por defecto el primero activo

  slides = [
    {
      bg: 'https://slider.eneba.games/resized/JuHYbgG8_W2gpaTA4xS6Uxn7MzS11vQL0nWdwt5i4Os_1500x400_1x-1500x400_150_0.jpg',
      thumb: 'https://slider.eneba.games/resized/JuHYbgG8_W2gpaTA4xS6Uxn7MzS11vQL0nWdwt5i4Os_200x400_1x-200x400_1800_0.jpg',
      link: '/latam/promo/doom?itm_source=eneba&itm_medium=banner&itm_campaign=Doom_games'
    },
    {
      bg: 'https://slider.eneba.games/resized/VXZN9bus_OQXBgu3kElsDqx3QPVOCa0SRz50239POhM_1500x400_1x-1500x400_150_0.jpg',
      thumb: 'https://slider.eneba.games/resized/VXZN9bus_OQXBgu3kElsDqx3QPVOCa0SRz50239POhM_200x400_1x-200x400_1800_0.jpg',
      link: '/latam/store/games?page=1&types%5B%5D=game&types%5B%5D=dlc&itm_source=eneba&itm_medium=banner&itm_campaign=cashback_on_games_dlc'
    },
    {
      bg: 'https://slider.eneba.games/resized/Bf3VBT2m5fv6hhLgCYgxurTqVTgOR9eXFN5jygiRE1k_1500x400_1x-1500x400_150_0.jpg',
      thumb: 'https://slider.eneba.games/resized/Bf3VBT2m5fv6hhLgCYgxurTqVTgOR9eXFN5jygiRE1k_200x400_1x-200x400_1800_0.jpg',
      link: '/latam/promo/windows-keys?itm_source=eneba&itm_medium=banner&itm_campaign=windows'
    },
    {
      bg: 'https://slider.eneba.games/resized/JXkjjbOFRnOc9Rad1ImCCwozYqKS8DkJWPuJ9KfRn7Y_1500x400_1x-1500x400_150_0.jpg',
      thumb: 'https://slider.eneba.games/resized/JXkjjbOFRnOc9Rad1ImCCwozYqKS8DkJWPuJ9KfRn7Y_200x400_1x-200x400_1800_0.jpg',
      link: '/latam/promo/racing-games?itm_source=eneba&itm_medium=banner&itm_campaign=racing_games'
    },
    // Agrega los demás objetos igual
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }
}
