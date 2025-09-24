
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  standalone:true,
  templateUrl: './reset-password.component.html',
  styleUrl:'./reset-password.component.css',
  imports: [ReactiveFormsModule, CommonModule,MatSnackBarModule,FormsModule],

  

})
export class ResetPasswordComponent {
  email!: string;
  token!: string;
  newpassword!: string;

  constructor(private authService: AuthService, private route: ActivatedRoute,private router: Router, private snackBar: MatSnackBar) {
    this.route.queryParams.subscribe(params => {
      //this.token = params['token'];
      this.token = decodeURIComponent(params['token']);

      this.email = params['email'];
    });
  }

  onSubmit() {
    this.authService.resetPassword(this.email, this.token, this.newpassword).subscribe(() => {
      this.snackBar.open('reset password  successfully! Redirecting to login...', 'Close', {
        duration: 5000, 
      });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000); // Delay in milliseconds
    },   
    error => {
      console.error(error);
    
      this.snackBar.open('reset failed . Please try again.', 'Close', {
        duration: 1000, 
      }); 
  });}}




