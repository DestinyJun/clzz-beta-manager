import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceInspectionComponent } from './device-inspection.component';

describe('DeviceInspectionComponent', () => {
  let component: DeviceInspectionComponent;
  let fixture: ComponentFixture<DeviceInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
