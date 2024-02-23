import {Observable} from "rxjs";

export interface Word {
  original: string;
  letters: string[];
}

export interface WordFactory {
  currentWord: Word | null;
  selectedLetters: string[];
  success$: Observable<boolean>;

  deselectLetter(letter: string): void;

  selectLetter(letter: string): void;
}
