import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterViewComponent } from '../shared/components/footer-view/footer-view.component';

@Component({
  selector: 'app-product',
  imports: [NavbarComponent,
            FooterViewComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
