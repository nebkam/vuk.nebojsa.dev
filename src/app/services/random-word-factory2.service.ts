import {Injectable} from '@angular/core';
import {Letter, SelectedLetter, WordFactory2} from "./word-factory2";
import {BehaviorSubject, filter, Observable, tap} from "rxjs";
import {FeedbackService} from "./feedback.service";
import WORDS from "../../assets/words/words.json";
import {shuffle} from "../lib/array";
import {wordToLetters} from "../lib/words";

@Injectable({
  providedIn: 'root'
})
export class RandomWordFactory2Service implements WordFactory2 {
  private readonly allWords: string[];
  private points = new BehaviorSubject(0);
  private success = new BehaviorSubject(false);

  letters: Letter[] = [];
  selectedLetters: SelectedLetter[] = [];
  points$ = this.points.asObservable();
  success$: Observable<boolean> = this.success.asObservable();
  word: string | null = null;

  constructor(private feedback: FeedbackService) {
    this.allWords = WORDS;
    this.success$
      .pipe(
        filter(Boolean),
        tap(() => this.feedback.success())
      ).subscribe();
    this.advance();
  }

  get total(): number {
    return this.allWords.length;
  }

  advance(): boolean {
    shuffle(this.allWords);
    this.setWord();

    return true;
  }

  deselect(selectedLetter: SelectedLetter, index: number): void {
    this.selectedLetters.splice(index, 1);
    this.letters[selectedLetter.index].selected = false;
    this.success.next(false);
  }

  select(letter: Letter, index: number): void {
    letter.selected = true;
    this.selectedLetters.push({value: letter.value, index});
    this.points.next(this.doesCurrentWordStartWithSelectedLetters() ? 1 : -1);
    this.success.next(this.isCurrentWordGuessed());
  }

  start(): void {
  }

  private setWord() {
    this.word = JSON.parse(JSON.stringify(this.allWords[0])) as string; // deep copy
    this.letters = wordToLetters(this.word);
    shuffle(this.letters);
    this.selectedLetters = [];
    this.success.next(false);
  }

  private doesCurrentWordStartWithSelectedLetters(): boolean {
    return this.word?.startsWith(this.selectedLetters.map(selectedLetter => selectedLetter.value).join('')) ?? false;
  }

  private isCurrentWordGuessed() {
    return this.word === this.selectedLetters.map(selectedLetter => selectedLetter.value).join('');
  }
}
