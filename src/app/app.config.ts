import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';

 import { routes } from './app.routes';

// const routes = [
//   { path: '', component: HomeComponent },
// ];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
