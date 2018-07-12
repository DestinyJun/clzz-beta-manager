import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageusersComponent } from './pageusers.component';

describe('PageusersComponent', () => {
  let component: PageusersComponent;
  let fixture: ComponentFixture<PageusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
