import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GuessTheLetterComponent} from './guess-the-letter.component';

describe('LettersComponent', () => {
  let component: GuessTheLetterComponent;
  let fixture: ComponentFixture<GuessTheLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessTheLetterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GuessTheLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
