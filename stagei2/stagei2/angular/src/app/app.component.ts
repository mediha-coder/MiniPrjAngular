
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ConversationComponent } from './conversation/conversation.component';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInputComponent } from './user-input/user-input.component';
import { MessagepanelComponent } from './messagepanel/messagepanel.component';
import { ConversationService } from './services/conversation.service';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { ConfirmEmailComponent } from './email-confirm/email-confirm.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { ProfileComponent } from './profil/profil.component';
import { ProfileService } from './services/profile.service';
import { NewChatDialogComponent } from './new-chat-dialog/new-chat-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ThemeService } from './services/ThemeService';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    JwtModule,
    CommonModule,MatSnackBarModule,RouterOutlet,HomeComponent, ChangePasswordComponent,ProfileComponent,ConfirmationComponent,RegisterComponent,LoginComponent,ConversationComponent,HttpClientJsonpModule,UserInputComponent,MessagepanelComponent,
  ],
  //imports: [ HttpClientModule,CommonModule,RouterOutlet,HomeComponent, RegisterComponent,LoginComponent,ConversationComponent,HttpClientJsonpModule,UserInputComponent,MessagepanelComponent,HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[HttpClient,AuthService,ThemeService,ConversationComponent,NewChatDialogComponent,HttpClientModule,JwtModule,ConversationService,ProfileService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]
  })
   

export class AppComponent {
  title = 'projet1';
  
  
}


