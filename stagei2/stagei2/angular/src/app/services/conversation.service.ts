
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Message, Conversation } from '../utility/constants';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl = 'https://localhost:7061'; 

  constructor(private http: HttpClient, private router: Router) {}

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/api/conversations`);
   
  }

  getConversation(id: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/api/conversations/${id}`);
    
  }
  /*deleteConversation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/conversations/${id}`);*/
    deleteConversation(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/api/conversations/${id}`);
    }
  

saveConversation(conversation: Conversation): Observable<Conversation> {
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  return this.http.post<Conversation>(`${this.apiUrl}/api/conversations`, conversation,{ headers: headers });
}

updateConversation( conversation: Conversation): Observable<Conversation> {
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  return this.http.put<Conversation>(`${this.apiUrl}/api/conversations/${conversation.id}`, conversation,{ headers: headers });
}
logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}



}
