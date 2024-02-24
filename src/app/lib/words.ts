import {Letter} from "../services/word-factory2";

export function wordToLetters(word: string): Letter[] {
  return word.split('').map(letter => ({
    value: letter,
    selected: false
  }));
}
