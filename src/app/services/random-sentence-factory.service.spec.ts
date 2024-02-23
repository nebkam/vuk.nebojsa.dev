import { TestBed } from '@angular/core/testing';

import { RandomSentenceFactoryService } from './random-sentence-factory.service';

describe('RandomSentenceFactoryService', () => {
  let service: RandomSentenceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomSentenceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
