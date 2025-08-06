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

    product!: Product;
    formattedDate: string = '';
    region: string = 'es-MX'; // puedes cambiar dinámicamente según la región del usuario

	constructor(private productoService: ProductService) {}

	ngOnInit(): void {
		this.productoService.getGameById(440).subscribe({
			next: (data) => {
				this.product = data;
                this.formattedDate = this.formatDateToSpanish(this.product.date);
                console.log('JSON: ', this.product);
			},
			error: (err) => {
				console.error('Error al cargar el producto:', err);
			}
		});
	}

    private formatDateToSpanish(dateStr: string | null): string {
        if (!dateStr) return 'Fecha no disponible';

        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('es-MX', {
            year: 'numeric',
            month: 'long', // short or long 
            day: 'numeric'
        }).format(date);
    }

    // Función para formatear moneda según región
    formatCurrency(amount: number): string {
        // Mapeo sencillo de moneda según región (podrías hacer más dinámico)
        const currencyMap: { [key: string]: string } = {
        'es-MX': 'MXN',
        'en-US': 'USD',
        'en-GB': 'GBP',
        // agregar más según necesidad
        };

        const currency = currencyMap[this.region] || 'USD'; // fallback a USD

        return new Intl.NumberFormat(this.region, {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'code' // 👈 Esto fuerza a mostrar 'MXN', 'USD', etc.
        }).format(amount);
    }
}
