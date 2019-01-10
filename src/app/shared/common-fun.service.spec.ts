import { TestBed, inject } from '@angular/core/testing';

import { CommonFunService } from './common-fun.service';

describe('CommonFunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonFunService]
    });
  });

  it('should be created', inject([CommonFunService], (service: CommonFunService) => {
    expect(service).toBeTruthy();
  }));
});
