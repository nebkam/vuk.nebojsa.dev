import {Injectable} from '@angular/core';
import WORDS from '../../assets/words/words.json';
import {shuffle} from "./array";
import {FeedbackService} from "./feedback.service";
import {BehaviorSubject, filter, tap} from "rxjs";
import {Word, WordFactory} from "./word-factory";

@Injectable({
  providedIn: 'root'
})
export class StaticWordFactoryService implements WordFactory {
  private allWords: Word[] = WORDS.map(word => {
    return {
      original: word,
      letters: shuffle<string>(word.split(''))
    };
  });
  private currentWordIndex = 0;
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

  get allWordsCount() {
    return this.allWords.length;
  }

  get currentWordNumber() {
    return this.currentWordIndex + 1;
  }

  deselectLetter(letter: string) {
    this.currentWord?.letters.push(letter);
    this.selectedLetters.splice(this.selectedLetters.indexOf(letter), 1);
    this.success.next(false);
  }

  nextWord(increment: boolean = true) {
    if (this.currentWordIndex === this.allWords.length - 1) {
      return false;
    }

    if (increment) {
      this.currentWordIndex++;
    }
    this.currentWord = this.allWords[this.currentWordIndex];
    this.selectedLetters = [];
    this.success.next(false);

    return true;
  }

  selectLetter(letter: string) {
    this.selectedLetters.push(letter);
    this.currentWord?.letters.splice(this.currentWord.letters.indexOf(letter), 1);
    this.success.next(this.isCurrentWordGuessed());
  }

  /**
   * Randomize words on the beginning
   */
  start() {
    shuffle<Word>(this.allWords);
    this.nextWord(false);
  }

  private isCurrentWordGuessed() {
    return this.currentWord?.original === this.selectedLetters.join('');
  }
}
