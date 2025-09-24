
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@Component({
  selector: 'app-forgot-password',
  standalone:true,
  templateUrl: './forgot-password.component.html',
styleUrl: './forgot-password.component.css',


  imports:[FormsModule,ReactiveFormsModule,CommonModule]
})
export class ForgotPasswordComponent {
  email!: string;
  emailSent = false;

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(() => {
      this.emailSent = true;
    });
  }
}
