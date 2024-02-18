import { TestBed } from '@angular/core/testing';

import { SentenceGuessingService } from './sentence-guessing.service';

describe('SentenceGuessingService', () => {
  let service: SentenceGuessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentenceGuessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
