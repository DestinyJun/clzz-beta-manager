import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataloadComponent } from './dataload.component';

describe('DataloadComponent', () => {
  let component: DataloadComponent;
  let fixture: ComponentFixture<DataloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
