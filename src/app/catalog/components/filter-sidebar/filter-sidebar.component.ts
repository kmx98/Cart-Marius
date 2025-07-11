import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'app-filter-sidebar',
    standalone: true,
    imports: [],
    templateUrl: './filter-sidebar.component.html',
    styleUrl: './filter-sidebar.component.css'
})
export class FilterSidebarComponent implements OnInit {

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        // Inicializar con la sección de ordenamiento expandida
        setTimeout(() => {
            this.toggleSection('sort');
        }, 0);

        // Configurar funcionalidad de búsqueda en filtros
        this.setupSearchFunctionality();
    }

    /**
     * Alterna la visibilidad de una sección del filtro
     * @param sectionId - ID de la sección a alternar
     */
    toggleSection(sectionId: string): void {
        const content = this.elementRef.nativeElement.querySelector(`#${sectionId}-content`) || 
                        this.elementRef.nativeElement.querySelector(`#${sectionId}-options`);
        const chevron = this.elementRef.nativeElement.querySelector(`#${sectionId}-chevron`);

        if (content && chevron) {
            if (content.classList.contains('show')) {
                content.classList.remove('show');
                chevron.classList.remove('up');
            } else {
                content.classList.add('show');
                chevron.classList.add('up');
            }
        }
    }

    /**
     * Alterna la visibilidad de la barra lateral
     */
    toggleSidebar(): void {
        const sidebar = this.elementRef.nativeElement.querySelector('.sidebar');

        if (sidebar) {
            // Implementación real para ocultar/mostrar la barra lateral
            sidebar.classList.toggle('hidden');
        } else {
            // Funcionalidad temporal
            alert('Funcionalidad de cerrar barra lateral');
        }
    }

    /**
     * Configura la funcionalidad de búsqueda en los filtros
     */
    private setupSearchFunctionality(): void {
        const searchInputs = this.elementRef.nativeElement.querySelectorAll('.search-input');

        searchInputs.forEach((input: HTMLInputElement) => {
            input.addEventListener('input', (event: Event) => {
                const target = event.target as HTMLInputElement;
                const searchTerm = target.value.toLowerCase();
                
                // Buscar el contenedor del filtro más cercano
                const filterContent = target.closest('.filter-content');
                if (filterContent) {
                    const checkboxList = filterContent.querySelector('.checkbox-list');
                    if (checkboxList) {
                        const items = checkboxList.querySelectorAll('.checkbox-item');
                        
                        items.forEach((item: Element) => {
                            const checkboxText = item.querySelector('.checkbox-text');
                            if (checkboxText) {
                                const text = checkboxText.textContent?.toLowerCase() || '';
                                const listItem = item as HTMLElement;
                                
                                if (text.includes(searchTerm)) {
                                    listItem.style.display = 'block';
                                } else {
                                    listItem.style.display = 'none';
                                }
                            }
                        });
                    }
                }
            });
        });
    }

    /**
     * Maneja el cambio de ordenamiento
     * @param event - Evento del radio button
     */
    onSortChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const sortValue = target.value;

        // Aquí puedes implementar la lógica de ordenamiento
        console.log('Ordenamiento seleccionado:', sortValue);

        // Ejemplo de implementación:
        // this.applySorting(sortValue);
    }

    /**
     * Maneja el cambio en los filtros de tipo de producto
     * @param event - Evento del checkbox
     */
    onTypeFilterChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const filterValue = target.value;
        const isChecked = target.checked;

        // Aquí puedes implementar la lógica de filtrado
        console.log(`Filtro ${filterValue} ${isChecked ? 'activado' : 'desactivado'}`);

        // Ejemplo de implementación:
        // this.applyTypeFilter(filterValue, isChecked);
    }

    /**
     * Maneja el cambio en los filtros de plataforma
     * @param event - Evento del checkbox
     */
    onPlatformFilterChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const filterValue = target.value;
        const isChecked = target.checked;

        // Aquí puedes implementar la lógica de filtrado
        console.log(`Filtro de plataforma ${filterValue} ${isChecked ? 'activado' : 'desactivado'}`);

        // Ejemplo de implementación:
        // this.applyPlatformFilter(filterValue, isChecked);
    }

    /**
     * Maneja el cambio en los filtros de género
     * @param event - Evento del checkbox
     */
    onGenreFilterChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const filterValue = target.value;
        const isChecked = target.checked;

        // Aquí puedes implementar la lógica de filtrado
        console.log(`Filtro de género ${filterValue} ${isChecked ? 'activado' : 'desactivado'}`);

        // Ejemplo de implementación:
        // this.applyGenreFilter(filterValue, isChecked);
    }

    /**
     * Maneja el cambio en los filtros de precio
     * @param event - Evento del input
     * @param type - Tipo de precio (min o max)
     */
    onPriceFilterChange(event: Event, type: 'min' | 'max'): void {
        const target = event.target as HTMLInputElement;
        const value = parseFloat(target.value);

        // Aquí puedes implementar la lógica de filtrado por precio
        console.log(`Precio ${type}:`, value);

        // Ejemplo de implementación:
        // this.applyPriceFilter(type, value);
    }

    // Métodos auxiliares para implementar la lógica de filtrado
    // Estos métodos los puedes implementar según tus necesidades

    /*
    private applySorting(sortValue: string): void {
        // Implementar lógica de ordenamiento
    }

    private applyTypeFilter(filterValue: string, isChecked: boolean): void {
        // Implementar lógica de filtrado por tipo
    }

    private applyPlatformFilter(filterValue: string, isChecked: boolean): void {
        // Implementar lógica de filtrado por plataforma
    }

    private applyGenreFilter(filterValue: string, isChecked: boolean): void {
        // Implementar lógica de filtrado por género
    }

    private applyPriceFilter(type: 'min' | 'max', value: number): void {
        // Implementar lógica de filtrado por precio
    }
    */
}
