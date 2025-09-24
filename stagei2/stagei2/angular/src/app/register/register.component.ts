
/*
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:true,
  imports:[MatFormFieldModule,MatInputModule,RouterModule,ReactiveFormsModule,MatIconModule,CommonModule, HttpClientModule],
  providers:[UserService,HttpClient],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  hidePassword = true;

togglePasswordVisibility(): void {
  this.hidePassword = !this.hidePassword;
}
  userForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('',Validators.required),

   
  });
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  matcher = new MyErrorStateMatcher();
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  
 constructor(private userService: UserService) {}
  onSubmit(): void {
    
    if (this.userForm.valid) { 
      const user = this.userForm.value;
      console.log('userrr',user)  ;
          this.userService.register(user).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.userForm.reset();  
        },
        error: (err) => {
          console.error('Registration error', err);
        }
      });
    } else {
      
      console.error('Form is not valid');
  }}}
     /* onSubmit(): void {
        if (this.userForm.valid) {
          
          const user = this.userForm.value;
        
          this.authService.register(user).subscribe({
            
            next: (response) => {
              console.log('User registered successfully', response);
            

              this.userForm.reset();
              // Rediriger l'utilisateur vers une autre page après l'enregistrement réussi si nécessaire
              // this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Registration error', err);
            }
          });
        } else {
          console.error('Form is not valid');
        }
      }
    
      // Autres méthodes et logique de composant
    }*/

      import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
      import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
      import { ErrorStateMatcher } from '@angular/material/core';
      import { MatInputModule } from '@angular/material/input';
      import { MatFormFieldModule } from '@angular/material/form-field';
      import { ReactiveFormsModule } from '@angular/forms';
      import { MatIconModule } from '@angular/material/icon';
      import { CommonModule } from '@angular/common';
      
      import { HttpClientModule } from '@angular/common/http';
      import {RouterModule} from '@angular/router';
      import { HttpClient } from '@angular/common/http';
      import { UserService } from '../services/user.service';
      import { FormsModule } from '@angular/forms';  
      import { Router } from '@angular/router';
      import { MatSnackBar } from '@angular/material/snack-bar';
      
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,

  styleUrls: ['./register.component.css'],
  imports:[MatFormFieldModule,FormsModule,MatInputModule,RouterModule,ReactiveFormsModule,MatIconModule,CommonModule, HttpClientModule]
})
export class RegisterComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  
    register() {
      this.authService.register(this.model).subscribe(() => {
        this.snackBar.open('Registration successful,please check your email to confirm your account', 'Close', {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      
      }, error => {
        console.error(error);
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      });
    }
    
}

 
 
    