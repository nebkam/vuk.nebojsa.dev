import {Letter} from "../services/word-factory";
import {Word} from "../services/sentence-factory";

export function sentenceToWords(sentence: string): Word[] {
  return sentence.split(' ').map(word => ({
    value: word,
    selected: false
  }));
}

export function wordToLetters(word: string): Letter[] {
  return word.split('').map(letter => ({
    value: letter,
    selected: false
  }));
}
