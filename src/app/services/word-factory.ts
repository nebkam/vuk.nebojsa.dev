import {Observable} from "rxjs";

export interface Letter {
  value: string;
  selected: boolean;
}

export interface SelectedLetter {
  value: string;
  index: number;
}

export interface WordFactory {
  letters: Letter[];
  selectedLetters: SelectedLetter[];
  success$: Observable<boolean>;
  total: number;
  word: string | null;

  deselect(selectedLetter: SelectedLetter, index: number): void;

  select(letter: Letter, index: number): void;

  start(): void;

  advance(): boolean;
}
