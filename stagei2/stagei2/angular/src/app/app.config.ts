import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';



export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), HttpClient,JwtHelperService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimations(), provideAnimationsAsync(), provideAnimationsAsync(),]
};


