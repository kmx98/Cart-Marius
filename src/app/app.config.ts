import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';

 import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

// const routes = [
//   { path: '', component: HomeComponent },
// ];

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes),
        provideHttpClient() // ✅ AÑADE ESTO
    ]
};
