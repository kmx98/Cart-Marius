import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-bar',
  standalone: true,
  imports: [],
  templateUrl: './scroll-bar.component.html',
  styleUrl: './scroll-bar.component.css'
})
export class ScrollBarComponent implements OnInit, AfterViewInit, OnDestroy{

  @Input() carousel!: HTMLElement;
  @ViewChild('scrollThumb', { static: false }) scrollThumb!: ElementRef<HTMLElement>;
  @ViewChild('scrollTrack', { static: false }) scrollTrack!: ElementRef<HTMLElement>;

  private isDragging: boolean = false;
  private startX: number = 0;
  private scrollStartLeft: number = 0;
  private resizeListener?: () => void;
  private animationFrameId?: number;

  ngOnInit(): void {
    // Inicialización del componente
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  ngOnDestroy(): void {
    // Limpiar event listeners y animation frames
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initializeCarousel(): void {
    if (!this.carousel || !this.scrollThumb || !this.scrollTrack) {
      console.error('No se pudieron encontrar los elementos requeridos del carousel');
      return;
    }

    // 🔹 Asegurar scroll instantáneo
    this.carousel.style.scrollBehavior = 'auto';

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
    
    // 🔹 Añadir clase para deshabilitar transiciones durante el drag
    this.scrollThumb.nativeElement.classList.add('dragging');
    
    // 🔹 Añadir clase no-select al body
    document.body.classList.add('no-select');
    document.body.style.cursor = 'grabbing';
    
    document.addEventListener('mousemove', this.onMouseMove, { passive: false });
    document.addEventListener('mouseup', this.onMouseUp, { passive: false });
    
    e.preventDefault();
  }

  private onMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging || !this.carousel || !this.scrollThumb || !this.scrollTrack) return;
    
    e.preventDefault();
    
    // 🔹 Cancelar frame anterior y crear uno nuevo para suavidad
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.animationFrameId = requestAnimationFrame(() => {
      this.performDrag(e.clientX);
    });
  }

  private performDrag(clientX: number): void {
    if (!this.carousel || !this.scrollThumb || !this.scrollTrack) return;

    const deltaX: number = clientX - this.startX;
    const trackWidth: number = this.scrollTrack.nativeElement.clientWidth;
    const thumbWidth: number = this.scrollThumb.nativeElement.offsetWidth;
    const maxThumbPosition: number = trackWidth - thumbWidth;
    
    // 🔹 Calcular relación exacta 1:1 con el movimiento del mouse
    // La relación debe ser: movimiento del mouse = movimiento del thumb
    const scrollRatio: number = deltaX / maxThumbPosition;
    const maxScroll: number = this.carousel.scrollWidth - this.carousel.clientWidth;
    
    const newScrollLeft = this.scrollStartLeft + (scrollRatio * maxScroll);
    
    // 🔹 Aplicar directamente para movimiento 1:1
    this.carousel.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
  }

  private onMouseUp = (): void => {
    this.isDragging = false;
    
    // 🔹 Remover clase dragging
    this.scrollThumb.nativeElement.classList.remove('dragging');
    
    // 🔹 Restaurar estilos del body
    document.body.classList.remove('no-select');
    document.body.style.cursor = '';
    
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  private handleTrackClick(e: MouseEvent): void {
    if (!this.carousel || !this.scrollThumb || !this.scrollTrack) return;
    if (e.target === this.scrollThumb.nativeElement) return;
    
    const rect: DOMRect = this.scrollTrack.nativeElement.getBoundingClientRect();
    const clickX: number = e.clientX - rect.left;
    const trackWidth: number = rect.width;
    
    const clickRatio: number = clickX / trackWidth;
    const maxScroll: number = this.carousel.scrollWidth - this.carousel.clientWidth;
    
    // 🔹 Movimiento inmediato sin animación
    this.carousel.scrollLeft = Math.max(0, Math.min(clickRatio * maxScroll, maxScroll));
  }

  private handleWheel(e: WheelEvent): void {
    if (!this.carousel) return;
    
    e.preventDefault();
    
    // 🔹 Aplicar directamente para máxima responsividad
    const scrollAmount = e.deltaY;
    const newScrollLeft = this.carousel.scrollLeft + scrollAmount;
    const maxScroll = this.carousel.scrollWidth - this.carousel.clientWidth;
    
    this.carousel.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
  }
}