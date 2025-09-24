
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../utility/constants';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-messagepanel',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './messagepanel.component.html',
  styleUrls: ['./messagepanel.component.css']
})
export class MessagepanelComponent {
  @Input() messages: Message[] = [];
  data: Message[] = [];

  //getMessageAlignment(message: Message) {
    //return message.id % 2 === 0 ? 'user-message' : 'bot-message';

    getMessageAlignment(message: Message): string {
      return message.isUser ? 'user-message' : 'bot-message';
    }
}
