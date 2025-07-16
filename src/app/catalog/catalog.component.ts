import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterViewComponent } from '../shared/components/footer-view/footer-view.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [FilterSidebarComponent,
            NavbarComponent, 
            FooterViewComponent,
            CardComponent],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.css'
})
export class CatalogComponent {

}