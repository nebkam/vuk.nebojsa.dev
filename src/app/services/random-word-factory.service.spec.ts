import { TestBed } from '@angular/core/testing';

import { RandomWordFactoryService } from './random-word-factory.service';

describe('RandomWordFactoryService', () => {
  let service: RandomWordFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomWordFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
