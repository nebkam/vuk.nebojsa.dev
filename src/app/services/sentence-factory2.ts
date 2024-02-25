import {Observable} from "rxjs";

export interface Word {
  value: string;
  selected: boolean;
}

export interface SelectedWord {
  value: string;
  index: number;
}

export interface SentenceFactory2 {
  selectedWords: SelectedWord[];
  sentence: string | null;
  success$: Observable<boolean>;
  total: number;
  words: Word[];

  deselect(selectedWord: SelectedWord, index: number): void;

  select(word: Word, index: number): void;

  start(): void;

  advance(): boolean;
}
