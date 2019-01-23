import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePluginComponent } from './date-plugin.component';

describe('DatePluginComponent', () => {
  let component: DatePluginComponent;
  let fixture: ComponentFixture<DatePluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
