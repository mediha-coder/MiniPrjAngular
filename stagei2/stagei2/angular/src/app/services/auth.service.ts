import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { resetPassword } from '../utility/constants';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7061/api/auth';
 
  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService){  
    
  }

  register(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, model);
  }


  
   
   
    login(model: any): Observable<any> {
        //return this.http.post(`${this.baseUrl}/login`, model).pipe(
        return this.http.post(`${this.baseUrl}/login`, model).pipe(
          map((response: any) => {
           
            const user = response;
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', response.token);//save token
            }
          })
        );
      }
      getToken() {
        return localStorage.getItem('token'); 
      }
      
     
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  confirmEmail(userId: number, code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirm-email`, {
      params: {
        userId,
        code
      }
    });
}

forgotPassword(email: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(`${this.baseUrl}/forgot-password`, { email }, { headers });
}

resetPassword(email:string,token:string,newpassword:string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(`${this.baseUrl}/reset-password`, { email, token, newpassword }, { headers });
}

changePassword(email:string,currentPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
  const requestBody = {
   
    email,
    currentPassword,
    newPassword,
    confirmNewPassword
  };
  return this.http.post(`${this.baseUrl}/change-password`, requestBody,{
    headers: { 'Content-Type': 'application/json' }});
}

}





 
  