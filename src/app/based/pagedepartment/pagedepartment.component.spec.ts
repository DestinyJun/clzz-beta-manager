import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedepartmentComponent } from './pagedepartment.component';

describe('PagedepartmentComponent', () => {
  let component: PagedepartmentComponent;
  let fixture: ComponentFixture<PagedepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagedepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
