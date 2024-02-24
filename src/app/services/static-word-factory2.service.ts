import {Injectable} from '@angular/core';
import {Letter, SelectedLetter, WordFactory2} from "./word-factory2";
import {BehaviorSubject, Observable} from "rxjs";
import WORDS from "../../assets/words/words.json";
import {shuffle} from "../lib/array";

@Injectable({
  providedIn: 'root'
})
export class StaticWordFactory2Service implements WordFactory2 {
  private readonly allWords: string[];
  private success = new BehaviorSubject(false);

  letters: Letter[] = [];
  selectedLetters: SelectedLetter[] = [];
  success$: Observable<boolean> = this.success.asObservable();
  word: string | null = null;
  wordIndex: number;

  constructor() {
    this.allWords = WORDS;
    this.wordIndex = 0;
  }

  get total(): number {
    return this.allWords.length;
  }

  advance(): boolean {
    if (this.wordIndex === this.allWords.length - 1) {
      return false;
    }
    this.wordIndex++;
    this.setWord();

    return true;
  }

  deselect(selectedLetter:SelectedLetter, index: number): void {
    this.selectedLetters.splice(index, 1);
    this.letters[selectedLetter.index].selected = false;
    this.success.next(false);
  }

  start(): void {
    shuffle(this.allWords);
    this.wordIndex = 0;
    this.setWord();
  }

  select(letter: Letter, index: number): void {
    letter.selected = true;
    this.selectedLetters.push({value: letter.value, index});
    this.success.next(this.isCurrentWordGuessed());
  }

  private setWord() {
    this.word = this.allWords[this.wordIndex];
    this.letters = wordToLetters(this.word);
    shuffle(this.letters);
    this.selectedLetters = [];
    this.success.next(false);
  }

  private isCurrentWordGuessed() {
    return this.word === this.selectedLetters.map(selectedLetter => selectedLetter.value).join('');
  }
}

function wordToLetters(word: string): Letter[] {
  return word.split('').map(letter => ({
    value: letter,
    selected: false
  }));
}
