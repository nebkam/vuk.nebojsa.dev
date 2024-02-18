import { TestBed } from '@angular/core/testing';

import { WordFactoryService } from './word-factory.service';

describe('SpellingService', () => {
  let service: WordFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
