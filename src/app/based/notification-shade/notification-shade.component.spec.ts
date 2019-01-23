import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationShadeComponent } from './notification-shade.component';

describe('NotificationShadeComponent', () => {
  let component: NotificationShadeComponent;
  let fixture: ComponentFixture<NotificationShadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationShadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
