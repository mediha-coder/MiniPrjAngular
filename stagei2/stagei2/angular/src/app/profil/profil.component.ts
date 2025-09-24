import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { Md5 } from 'ts-md5';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone:true,
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports:[CommonModule,MatButtonModule,MatMenuModule,],
  providers: [ProfileService],
})
export class ProfileComponent  implements OnInit{
  menuOpen = false;
  email: string = "medihaabid01@gmail.com";
  profileImageUrl: string='assets/ras.png';


  constructor(private profileService: ProfileService,private router:Router) {
  }
  
  ngOnInit(): void {
    this.profileService. getUserProfilePhoto().subscribe(data => {
      this.profileImageUrl = data

    }
  );
    
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
 
  logout() {
   
    this.router.navigate(['/home']);
  }
  resetpassword(){
    this.router.navigate(['/change-password'])
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = String(e.target.result); // Convertir en chaîne
      };
      reader.readAsDataURL(file);
    }
  }
  Editprofile(){
    this.router.navigate(['/edit-profile'])
  }
     

  loadUserProfilePhoto() {
    this.profileService.getUserProfilePhoto().subscribe(photoUrl => {
      this.profileImageUrl = photoUrl;
    });
  }
  
}
