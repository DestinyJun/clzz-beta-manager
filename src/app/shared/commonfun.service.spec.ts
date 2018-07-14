import { TestBed, inject } from '@angular/core/testing';

import { CommonfunService } from './commonfun.service';

describe('CommonfunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonfunService]
    });
  });

  it('should be created', inject([CommonfunService], (service: CommonfunService) => {
    expect(service).toBeTruthy();
  }));
});
