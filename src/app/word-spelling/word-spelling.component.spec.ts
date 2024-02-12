import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WordSpellingComponent} from './word-spelling.component';

describe('WordsSpellingComponent', () => {
  let component: WordSpellingComponent;
  let fixture: ComponentFixture<WordSpellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSpellingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WordSpellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
