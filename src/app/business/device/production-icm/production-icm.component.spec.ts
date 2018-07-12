import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionIcmComponent } from './production-icm.component';

describe('ProductionIcmComponent', () => {
  let component: ProductionIcmComponent;
  let fixture: ComponentFixture<ProductionIcmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionIcmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionIcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
