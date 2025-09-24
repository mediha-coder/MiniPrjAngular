
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router, RouterModule } from '@angular/router';
import { UserInputComponent } from '../user-input/user-input.component';
import { HeaderComponent } from '../header/header.component';
import { MessagepanelComponent } from '../messagepanel/messagepanel.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  standalone:true,
  styleUrls: ['./changepassword.component.css'],
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
  ]
})
export class ChangePasswordComponent {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private Service: AuthService,private snackBar: MatSnackBar, private router: Router) {}

  changePassword() {
  
    this.Service.changePassword(this.email, this.currentPassword, this.newPassword,this.confirmNewPassword).subscribe(
      response => {
        console.log('Password changed successfully',response);
        this.email = '';
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.snackBar.open('reset password  successfully! Redirecting to login...', 'Close', {
          duration: 5000, 
        });
  
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000); 
      },   
        
      
      
      (error) => {
        console.error('Error changing password', error);
      }
    );
  }
}