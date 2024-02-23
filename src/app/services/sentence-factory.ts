import {Observable} from "rxjs";

export interface Sentence {
  original: string;
  words: string[];
}

export interface SentenceFactory {
  currentSentence: Sentence | null;
  selectedWords: string[];
  success$: Observable<boolean>;

  deselectWord(word: string): void;

  selectWord(word: string): void;
}
