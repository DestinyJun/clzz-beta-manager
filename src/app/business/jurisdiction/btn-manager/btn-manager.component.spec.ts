import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnManagerComponent } from './btn-manager.component';

describe('BtnManagerComponent', () => {
  let component: BtnManagerComponent;
  let fixture: ComponentFixture<BtnManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
