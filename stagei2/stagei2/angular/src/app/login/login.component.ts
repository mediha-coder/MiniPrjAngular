
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm,FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[MatFormFieldModule,FormsModule,MatInputModule,RouterModule,ReactiveFormsModule,MatIconModule,CommonModule, HttpClientModule],

  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.model).subscribe(() => {
      this.router.navigate(['/chat']);
      console.log('log successfully');

    }, error => {
      console.error(error);
    });
  }
}







      
  
  
     
   
   