import {Observable} from "rxjs";

export interface Letter {
  value: string;
  selected: boolean;
}

export interface WordFactory2 {
  word: string | null;
  letters: Letter[];
  success$: Observable<boolean>;
  total: number;

  toggle(letter: Letter): void;

  start(): void;

  advance(): boolean;
}
