import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicspackAmendComponent } from './technicspack-amend.component';

describe('TechnicspackAmendComponent', () => {
  let component: TechnicspackAmendComponent;
  let fixture: ComponentFixture<TechnicspackAmendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicspackAmendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicspackAmendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
