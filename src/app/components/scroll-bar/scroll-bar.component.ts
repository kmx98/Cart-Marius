import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-bar',
  standalone: true,
  imports: [],
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.css'
})
export class ScrollBarComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() carousel!: HTMLElement;  // 🔹 ahora viene desde el padre
  @ViewChild('scrollThumb', { static: false }) scrollThumb!: ElementRef<HTMLElement>;
  @ViewChild('scrollTrack', { static: false }) scrollTrack!: ElementRef<HTMLElement>;

  private isDragging: boolean = false;
  private startX: number = 0;
  private scrollStartLeft: number = 0;
  private resizeListener?: () => void;

  ngOnInit(): void {
    // Inicialización del componente
  }

  ngAfterViewInit(): void {
    // Inicializar el carousel después de que la vista esté lista
    console.log('Carousel element:', this.carousel);
    console.log('ScrollThumb element:', this.scrollThumb);
    console.log('ScrollTrack element:', this.scrollTrack);
    this.initializeCarousel();
  }

  ngOnDestroy(): void {
    // Limpiar event listeners
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private initializeCarousel(): void {
    if (!this.carousel || !this.scrollThumb || !this.scrollTrack) {
      console.error('No se pudieron encontrar los elementos requeridos del carousel');
      return;
    }

    // Actualizar scrollbar cuando se haga scroll
    this.carousel.addEventListener('scroll', () => this.updateScrollbar());

    // Drag del thumb
    this.scrollThumb.nativeElement.addEventListener('mousedown', (e: MouseEvent) => this.handleMouseDown(e));

    // Click en el track para mover el thumb a esa posición
    this.scrollTrack.nativeElement.addEventListener('click', (e: MouseEvent) => this.handleTrackClick(e));

    // Habilitar scroll con rueda del mouse
    this.carousel.addEventListener('wheel', (e: WheelEvent) => this.handleWheel(e));

    // Actualizar cuando cambie el tamaño de la ventana
    this.resizeListener = () => this.updateScrollbar();
    window.addEventListener('resize', this.resizeListener);

    // Inicializar
    this.updateScrollbar();
  }

  private updateScrollbar(): void {
    if (!this.carousel || !this.scrollThumb) return;

    const carouselEl = this.carousel;
    const thumbEl = this.scrollThumb.nativeElement;

    const scrollWidth: number = carouselEl.scrollWidth;
    const clientWidth: number = carouselEl.clientWidth;
    const scrollLeft: number = carouselEl.scrollLeft;
    
    // Calcular el ancho del thumb
    const thumbWidth: number = (clientWidth / scrollWidth) * 100;
    thumbEl.style.width = thumbWidth + '%';
    
    // Calcular la posición del thumb
    const thumbPosition: number = (scrollLeft / (scrollWidth - clientWidth)) * (100 - thumbWidth);
    thumbEl.style.left = thumbPosition + '%';
  }

  private handleMouseDown(e: MouseEvent): void {
    if (!this.carousel) return;

    this.isDragging = true;
    this.startX = e.clientX;
    this.scrollStartLeft = this.carousel.scrollLeft;
    
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.preventDefault();
  }

  private onMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging || !this.carousel || !this.scrollThumb || !this.scrollTrack) return;
    
    const deltaX: number = e.clientX - this.startX;
    const trackWidth: number = this.scrollTrack.nativeElement.clientWidth;
    const thumbWidth: number = this.scrollThumb.nativeElement.offsetWidth;
    const maxThumbPosition: number = trackWidth - thumbWidth;
    
    // Hacer el movimiento más sensible/rápido (multiplicar por 2)
    const scrollRatio: number = (deltaX * 2) / maxThumbPosition;
    const maxScroll: number = this.carousel.scrollWidth - this.carousel.clientWidth;
    
    this.carousel.scrollLeft = this.scrollStartLeft + (scrollRatio * maxScroll);
  }

  private onMouseUp = (): void => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  private handleTrackClick(e: MouseEvent): void {
    if (!this.carousel || !this.scrollThumb || !this.scrollTrack) return;
    if (e.target === this.scrollThumb.nativeElement) return;
    
    const rect: DOMRect = this.scrollTrack.nativeElement.getBoundingClientRect();
    const clickX: number = e.clientX - rect.left;
    const trackWidth: number = rect.width;
    
    // Calcular la posición donde debería estar el centro del thumb
    const clickRatio: number = clickX / trackWidth;
    const maxScroll: number = this.carousel.scrollWidth - this.carousel.clientWidth;
    
    this.carousel.scrollLeft = clickRatio * maxScroll;
  }

  private handleWheel(e: WheelEvent): void {
    if (!this.carousel) return;
    
    e.preventDefault();
    this.carousel.scrollLeft += e.deltaY;
  }

}
