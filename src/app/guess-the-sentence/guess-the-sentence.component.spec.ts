import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTheSentenceComponent } from './guess-the-sentence.component';

describe('GuessTheSentenceComponent', () => {
  let component: GuessTheSentenceComponent;
  let fixture: ComponentFixture<GuessTheSentenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessTheSentenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessTheSentenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
