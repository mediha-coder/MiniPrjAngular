
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:5080'; 

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.get<any[]>(`${this.apiUrl}/api/User`,user);
  }

  login(email: any, password: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Login`, { email, password });
  }
 
}