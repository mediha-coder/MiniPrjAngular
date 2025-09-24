import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  providers: [ProfileService],
})
export class EditProfileComponent implements OnInit {
  activeTheme: string = '';

  selectedFile: File | null = null;
  profileImageUrl: string = 'assets/ras.png';
  constructor(
    private profileService: ProfileService,
    private router: Router,
   private http: HttpClient
  ) {}

  ngOnInit(): void {
    //this.loadProfileImage();
    //this.activeTheme = this.themeservice.getActiveTheme();
  }
  loadProfileImage() {
    this.http.get('https://localhost:7061/api/Profile/profile')
      .subscribe({
        next: (profile: any) => {
          this.profileImageUrl = profile.ProfileImageUrl;
        },
        error: (error) => console.error('Error loading profile image', error)
        
      });
      this.profileImageUrl = '';}

  

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }}
    

    saveProfileImage() {
      if (this.selectedFile) {
     
        this.profileService.uploadPhoto(this.selectedFile)
          .subscribe({
            next: (response) => console.log('Profile image updated successfully.'),
            
            error: (error) => console.error('Error updating profile image', error)
          });
      } else {
        console.log('No file selected');
      }
      this.router.navigate(['/chat'])
    }
  
 
  Editprofile() {
    this.router.navigate(['/edit-profile']);
  }
}

