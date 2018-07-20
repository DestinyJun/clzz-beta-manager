import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraGroupComponent } from './camera-group.component';

describe('CameraGroupComponent', () => {
  let component: CameraGroupComponent;
  let fixture: ComponentFixture<CameraGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
