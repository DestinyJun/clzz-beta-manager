import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagevideoComponent } from './pagevideo.component';

describe('PagevideoComponent', () => {
  let component: PagevideoComponent;
  let fixture: ComponentFixture<PagevideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagevideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
