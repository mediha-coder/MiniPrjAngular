import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagepanelComponent } from './messagepanel.component';

describe('MessagepanelComponent', () => {
  let component: MessagepanelComponent;
  let fixture: ComponentFixture<MessagepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagepanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
