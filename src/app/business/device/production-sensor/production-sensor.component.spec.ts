import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionSensorComponent } from './production-sensor.component';

describe('ProductionSensorComponent', () => {
  let component: ProductionSensorComponent;
  let fixture: ComponentFixture<ProductionSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
