import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedeviceComponent } from './pagedevice.component';

describe('PagedeviceComponent', () => {
  let component: PagedeviceComponent;
  let fixture: ComponentFixture<PagedeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagedeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
