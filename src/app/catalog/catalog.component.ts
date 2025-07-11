import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterViewComponent } from '../shared/components/footer-view/footer-view.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';

@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [FilterSidebarComponent ,NavbarComponent, FooterViewComponent],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.css'
})
export class CatalogComponent {

}