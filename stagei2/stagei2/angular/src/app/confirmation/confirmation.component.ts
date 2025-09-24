import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';



@Component({
    standalone:true,
  selector: 'app-confirmation',
  templateUrl:'confirmation.component.html',
  imports:[CommonModule,MatFormFieldModule,FormsModule,MatInputModule,ReactiveFormsModule]
    
  
})
export class ConfirmationComponent {
  confirmEmailModel = { email:'', code: '' };
  constructor(private router: Router,private http: HttpClient, private snackBar: MatSnackBar) {}


  onConfirmEmail() {
    this.http.post('https://localhost:7061/api/auth/confirm-email', this.confirmEmailModel).subscribe(
      response => {
        console.log(response);
        this.snackBar.open('Email confirmed successfully! Redirecting to login...', 'Close', {
          duration: 5000, 
        });

        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error => {
        console.error(error);
    
        this.snackBar.open('Email confirmation failed. Please try again.', 'Close', {
          duration: 1000, 
        });
      }
    );
  }}
