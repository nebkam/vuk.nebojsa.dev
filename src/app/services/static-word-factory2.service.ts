import {Injectable} from '@angular/core';
import {Letter, WordFactory2} from "./word-factory2";
import {BehaviorSubject, Observable} from "rxjs";
import WORDS from "../../assets/words/words.json";

@Injectable({
  providedIn: 'root'
})
export class StaticWordFactory2Service implements WordFactory2 {
  private allWords: string[];
  private success = new BehaviorSubject(false);
  private wordIndex: number;

  letters: Letter[] = [];
  success$: Observable<boolean> = this.success.asObservable();
  word: string | null = null;

  constructor() {
    this.allWords = WORDS;
    this.wordIndex = 0;
  }

  get total(): number {
    return this.allWords.length;
  }

  advance(): boolean {
    return false;
  }

  start(): void {
  }

  toggle(letter: Letter): void {
  }
}
