import { TestBed } from '@angular/core/testing';

import { SentenceFactoryService } from './sentence-factory.service';

describe('SentenceGuessingService', () => {
  let service: SentenceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentenceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
