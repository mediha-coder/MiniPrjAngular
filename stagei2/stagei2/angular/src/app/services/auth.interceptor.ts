import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  
intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const currentUserJson = localStorage.getItem('currentUser');
    
    if (currentUserJson) {
      try {
        
        const currentUser = JSON.parse(currentUserJson);
        const token = currentUser.token; // Accéder à la propriété token
  
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      } catch (e) {
        console.error('Erreur lors de l’analyse du JSON :', e);
      }
    }
    
    return next.handle(request);
  }}
