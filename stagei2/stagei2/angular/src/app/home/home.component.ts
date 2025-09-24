import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private  gapi: any;
  constructor(private router:Router){}
 /* ngOnInit(): void {
    this.renderGoogleSignInButton();
  }*/

   

  navigateToSignIn(){
    this.router.navigate(['/login'])
  }
  navigateToRegister(){
    this.router.navigate(['/register'])

  }
  

}
