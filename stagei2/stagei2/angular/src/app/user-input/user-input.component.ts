
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { Message } from '../utility/constants';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule,HttpClientModule
  ],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  @Output() sendMessageEmitter = new EventEmitter<string>();
  message: string = '';

  sendMessage() {
    if (this.message.trim()) {
      this.sendMessageEmitter.emit(this.message);
      this.message = '';
    }
  }
}

