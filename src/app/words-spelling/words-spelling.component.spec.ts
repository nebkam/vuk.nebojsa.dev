import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsSpellingComponent } from './words-spelling.component';

describe('WordsSpellingComponent', () => {
  let component: WordsSpellingComponent;
  let fixture: ComponentFixture<WordsSpellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsSpellingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordsSpellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
