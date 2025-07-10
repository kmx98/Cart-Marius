import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterViewComponent } from '../components/footer-view/footer-view.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NavbarComponent,
            FooterViewComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

}
