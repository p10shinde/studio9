import { TestBed } from '@angular/core/testing';

import { OfferingService } from './offering.service';

describe('OfferingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferingService = TestBed.get(OfferingService);
    expect(service).toBeTruthy();
  });
});
