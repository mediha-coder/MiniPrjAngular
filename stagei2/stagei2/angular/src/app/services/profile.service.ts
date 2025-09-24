import { Md5 } from 'ts-md5';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root' 
  })

export class ProfileService {
  private profileImageUrl: string = '';
  private profileInfoSubject = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient, private authService:AuthService) {}

  getUserProfilePhoto(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get<any>('https://localhost:7061/api/Profile/profile',{ headers }); 
  }
  uploadPhoto(file: File): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`https://localhost:7061/api/Profile/upload-photo`, formData,{ headers });
  }
 
}
