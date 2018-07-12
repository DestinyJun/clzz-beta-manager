import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicspackTemperatureComponent } from './technicspack-temperature.component';

describe('TechnicspackTemperatureComponent', () => {
  let component: TechnicspackTemperatureComponent;
  let fixture: ComponentFixture<TechnicspackTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicspackTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicspackTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
