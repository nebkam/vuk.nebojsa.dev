import { TestBed } from '@angular/core/testing';

import { StaticWordFactoryService } from './static-word-factory.service';

describe('StaticWordFactoryService', () => {
  let service: StaticWordFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticWordFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
