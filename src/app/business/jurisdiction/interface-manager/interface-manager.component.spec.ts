import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceManagerComponent } from './interface-manager.component';

describe('InterfaceManagerComponent', () => {
  let component: InterfaceManagerComponent;
  let fixture: ComponentFixture<InterfaceManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
