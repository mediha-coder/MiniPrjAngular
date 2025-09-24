




import { MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Message, Conversation } from '../utility/constants';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ConversationComponent } from '../conversation/conversation.component';
import { Observable } from 'rxjs/internal/Observable';
@Component({
 
  selector: 'app-new-chat-dialog',
 templateUrl: './new-chat-dialog.component.html',
 styleUrls: ['./new-chat-dialog.component.css'],
  standalone:true,
  imports: [MatToolbarModule, CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ConversationComponent,
    FormsModule,
    MatSidenavModule],
  
})
export class NewChatDialogComponent {
 
  conversationTitle: string = '';
 

 
  constructor(public dialogRef: MatDialogRef<NewChatDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onStart():void{
    
    
  if (this.conversationTitle.trim()) {
   
    this.dialogRef.close(this.conversationTitle);
  } else {
    
    console.log('The title is empty.');
  }
    

  }

}

