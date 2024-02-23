import { TestBed } from '@angular/core/testing';

import { StaticSentenceFactoryService } from './static-sentence-factory.service';

describe('SentenceGuessingService', () => {
  let service: StaticSentenceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticSentenceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
