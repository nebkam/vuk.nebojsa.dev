import {Injectable} from '@angular/core';
import {Word, WordFactory} from "./word-factory";
import {BehaviorSubject, filter, tap} from "rxjs";
import WORDS from "../../assets/words/words.json";
import {shuffle} from "./array";
import {FeedbackService} from "./feedback.service";

@Injectable({
  providedIn: 'root'
})
export class RandomWordFactoryService implements WordFactory {
  private allWords: Word[] = WORDS.map(word => {
    return {
      original: word,
      letters: word.split('')
    };
  });
  private success = new BehaviorSubject(false);

  currentWord: Word | null = null;
  selectedLetters: string[] = [];
  success$ = this.success.asObservable();

  constructor(private feedback: FeedbackService) {
    this.success$
      .pipe(
        filter(Boolean),
        tap(() => this.feedback.success())
      ).subscribe();
  }

  private isCurrentWordGuessed() {
    return this.currentWord?.original === this.selectedLetters.join('');
  }

  deselectLetter(letter: string): void {
    this.currentWord?.letters.push(letter);
    this.selectedLetters.splice(this.selectedLetters.indexOf(letter), 1);
    this.success.next(false);
  }

  randomWord() {
    shuffle<Word>(this.allWords);
    this.currentWord = this.allWords[0];
    shuffle<string>(this.currentWord.letters);
    this.selectedLetters = [];
    this.success.next(false);
  }

  selectLetter(letter: string): void {
    this.selectedLetters.push(letter);
    this.currentWord?.letters.splice(this.currentWord.letters.indexOf(letter), 1);
    this.success.next(this.isCurrentWordGuessed());
  }
}
