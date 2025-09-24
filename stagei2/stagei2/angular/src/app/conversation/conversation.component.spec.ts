import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationComponent } from './conversation.component';
import { HttpClientModule, HttpHandler } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationComponent],
      providers:[HttpHandler,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
