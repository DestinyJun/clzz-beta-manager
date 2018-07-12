import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagetechnologyComponent } from './pagetechnology.component';

describe('PagetechnologyComponent', () => {
  let component: PagetechnologyComponent;
  let fixture: ComponentFixture<PagetechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagetechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagetechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
