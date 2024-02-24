import {Injectable} from '@angular/core';
import {Letter, WordFactory2} from "./word-factory2";
import {BehaviorSubject, Observable} from "rxjs";
import WORDS from "../../assets/words/words.json";
import {shuffle} from "../lib/array";

@Injectable({
  providedIn: 'root'
})
export class StaticWordFactory2Service implements WordFactory2 {
  private readonly allWords: string[];
  private success = new BehaviorSubject(false);
  private wordIndex: number;

  letters: Letter[] = [];
  success$: Observable<boolean> = this.success.asObservable();
  word: string | null = null;

  constructor() {
    this.allWords = WORDS;
    this.wordIndex = 0;
  }

  get selectedLetters(): Letter[] {
    return this.letters.filter(letter => letter.selected);
  }

  get total(): number {
    return this.allWords.length;
  }

  advance(): boolean {
    return false;
  }

  start(): void {
    shuffle(this.allWords);
    this.wordIndex = 0;
    this.word = this.allWords[this.wordIndex];
    this.letters = wordToLetters(this.word);
    shuffle(this.letters);
  }

  toggle(letter: Letter): void {
    letter.selected = !letter.selected;
  }
}

function wordToLetters(word: string): Letter[] {
  return word.split('').map(letter => ({
    value: letter,
    selected: false
  }));
}
