import { TestBed } from '@angular/core/testing';

import { CustomMatIconRegistryService } from './custom-mat-icon-registry.service';

describe('CustomMatIconRegistryService', () => {
  let service: CustomMatIconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMatIconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
