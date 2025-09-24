
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ConversationComponent } from './conversation/conversation.component';


import { NgModule } from '@angular/core';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ConversationComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'confirmation', component: ConfirmationComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'edit-profile', component: EditProfileComponent },


    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
