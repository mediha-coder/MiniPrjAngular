import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, Injectable, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { UserInputComponent } from '../user-input/user-input.component';
import { HeaderComponent } from '../header/header.component';
import { MessagepanelComponent } from '../messagepanel/messagepanel.component';
import { Message, Conversation } from '../utility/constants';
import { ConversationService } from '../services/conversation.service';
import { Observable } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from '../profil/profil.component';
import { MatDialog } from '@angular/material/dialog';
import { NewChatDialogComponent } from '../new-chat-dialog/new-chat-dialog.component';
import { ProfileService } from '../services/profile.service';
@Injectable({
  providedIn: 'root' 
})
@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  imports: [
 
    MatToolbarModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RouterModule,
    UserInputComponent,
    MessagepanelComponent,
    HeaderComponent,
    FormsModule,
    MatSidenavModule,
 ProfileComponent 

  ],
  providers: [ConversationService, ProfileService],
})
export class ConversationComponent implements OnInit {
 
  showFiller = false;
  username: string = '';
  isTyping: boolean = false;
  userMessage: string = '';
  data: Message[] = [];
  messageId: number = 0;
  conversationId = 0;
  conversationTitle: string = '';
  showSavedConversations: boolean = false;
  savedConversations$!: Observable<Conversation[]>;
  conversation: Conversation = { id: 0, title: '', messages: [] };
  showTitleInput: boolean = false;
  title: string = '';
  selectedConversation: Conversation | null = null;
  titleSaved: boolean = false;
  drawer: any;
  sidenavOpened: boolean=false;
 // profileImageUrl: string='assets/ras.png';

  constructor(public conversationService: ConversationService, public ProfileService:ProfileService,public dialog: MatDialog) {}

  ngOnInit(): void {
    //this.username = localStorage.getItem('username') || 'Guest';
    this.loadConversations();
 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '450px',
    }
    
  )

    dialogRef.afterClosed().subscribe((result ) => {
  
     
      
      if (result) {
        this.conversationTitle = result;  
        this.saveTitle(result);
      }
      
          
    });
  }
 
  startNewConversation() {
    this.conversationTitle = '';
   this.showTitleInput = true;
    this.data = [];
    this.messageId = 0;
    this.titleSaved = false;
    this.selectedConversation = null;
  }
  
  selectConversation(conversation: {
    id: number;
    title: string;
    messages: Message[];
  }) {
    this.selectedConversation = conversation;

    this.data = [...conversation.messages];
    this.conversationTitle = conversation.title;
    this.showTitleInput = false;
    this.titleSaved = true;
  }
  
  /*getMessage(event: string) {
    const messageObject: Message = {
      content: event,
      isUser: true,
      id: this.messageId,
      conversationId: this.conversationId,
    };

    this.data.push(messageObject);
    this.messageId++;

    setTimeout(() => {
      const botMessage: Message = {
        content: 'This is a response from the chat',
        isUser: false,
        id: this.messageId,
        conversationId: this.conversationId,

      };
      this.data.push(botMessage);
      this.messageId++;
    }, 500);
  }
*/
getMessage(message: string, isUser: boolean = true) {
  const isoDate = new Date().toISOString(); 
  const dateWithoutMillis = isoDate.split('.')[0]; 

  const formattedDate = dateWithoutMillis.replace('T', ' ');
  const newMessage: Message = {
    content: message,
    isUser: isUser,
    id: this.messageId,
    conversationId: this.selectedConversation ? this.selectedConversation.id : 0,
    createdAt: formattedDate,
   
  };

  this.data = [...(this.data || []), newMessage];
 
}
getChatbotResponse(userMessage: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Response to: ${userMessage}`);
    }, 500); 
  });
}
toggleSidenav() {
  this.sidenavOpened = !this.sidenavOpened;
}

  addMessage(message: string) {
    const isoDate = new Date().toISOString(); 
    const dateWithoutMillis = isoDate.split('.')[0]; 
   

    const formattedDate = dateWithoutMillis.replace('T', ' ');
    if (message.trim() !== '') {
      if (this.selectedConversation) {
        const newMessage: Message = {
          content: message,
          isUser: true,
          id: this.messageId++,
          conversationId: this.selectedConversation.id,
          createdAt: formattedDate,        };
      
        this.data.push(newMessage);
      }
    }
  }
  sendMessage() {
    if (this.userMessage.trim()) {
      this.getMessage(this.userMessage);
      this.userMessage = '';
    }
  }

  saveTitle(title:string) {
    const newConversation: Conversation = {
      id: this.conversationId,
      title: this.conversationTitle,
      messages: this.data,
    };
    
    this.conversationService.saveConversation(newConversation).subscribe(
      (response) => {
        console.log('ok',response);
        this.conversation = response;
        this.conversationId = newConversation.id;
        this.showTitleInput = false;
        this.titleSaved = true;
       // this.conversationTitle=title;
       
        this.loadConversations();
      },
      (error) => {
        console.error('Error saving conversation title:', error);

        alert('There was an error saving the conversation. Please try again.');
      }
    );
  }

 
saveNewConversation() {
  if (this.conversationTitle.trim()) {
    const newConversation: Conversation = {
      id: 0, 
      title: this.conversationTitle.trim(),
      messages: this.data
    };

    this.conversationService.saveConversation(newConversation).subscribe(
      response => {
        this.loadConversations();
        this.selectedConversation = response;
        console.log('Conversation saved successfully', response);
        this.conversation = response;
        this.conversationId = response.id;
        this.showTitleInput = false;
        this.titleSaved = true;
      },
      error => {
        console.error('Error saving conversation', error);
      }
    );
  }
}

  updateExistingConversation() {
    if (this.selectedConversation) {
      const updatedMessages = [
        ...this.selectedConversation.messages,
        ...this.data,
      ];

      const updatedConversation: Conversation = {
        messages: updatedMessages,
        id: this.selectedConversation.id,
        title: this.selectedConversation.title,
      };

      this.conversationService
        .updateConversation(updatedConversation)
        .subscribe(
          (response) => {
            console.log('Conversation messages updated successfully', response);
            this.conversation = updatedConversation;
            this.conversationId = updatedConversation.id;
       
            this.loadConversations();
          },
          (error) => {
            console.error('Error updating conversation messages:', error);
          }
        );
    }
  }
   

  saveMessages() {
    if (this.selectedConversation) {
      this.updateExistingConversation();
   
    }
  }
  
  newMessages: Message[] = [];

sendMessageAndSave() {
  if (this.userMessage.trim()) {
    const userMessage = this.userMessage.trim();
    this.userMessage = '';

    this.getMessage(userMessage); 

    this.getChatbotResponse(userMessage).then(chatbotResponse => {
      this.getMessage(chatbotResponse, false); 

      if (this.selectedConversation) {
        this.updateExistingConversation(); 
      } else {
        this.saveNewConversation(); 
      }
    });
  }
}


  

  loadConversation(id: number) {
    this.conversationService.getConversation(id).subscribe((conversation) => {
      if (conversation) {
        this.data = [...conversation.messages];
      }
    });
  }

  loadConversations(): void {
    this.savedConversations$ = this.conversationService.getConversations();
  }

  toggleSavedConversations() {
    this.showSavedConversations = !this.showSavedConversations;
  }

  logout(){
    this.conversationService.logout();
  }
}
