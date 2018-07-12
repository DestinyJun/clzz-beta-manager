import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagejurisComponent } from './pagejuris.component';

describe('PagejurisComponent', () => {
  let component: PagejurisComponent;
  let fixture: ComponentFixture<PagejurisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagejurisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagejurisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
