import { TestBed } from '@angular/core/testing';

import { CustomsnackbarService } from './customsnackbar.service';

describe('CustomsnackbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomsnackbarService = TestBed.get(CustomsnackbarService);
    expect(service).toBeTruthy();
  });
});
