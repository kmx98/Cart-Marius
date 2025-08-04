import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterViewComponent } from '../shared/components/footer-view/footer-view.component';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'app-product',
  imports: [NavbarComponent,
            FooterViewComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  // product: Product[] = [];
  product!: Product;


  constructor(private productoService: ProductService) {}

  ngOnInit(): void {
    this.productoService.getGameById(440).subscribe(data => {
      this.product = data;
    });
  }
}
