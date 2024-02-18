import {Injectable} from '@angular/core';
import WORDS from '../../assets/words/words.json';
import {shuffle} from "../array";

interface Word {
  original: string;
  letters: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SpellingService {
  currentWord: Word | null = null;
  selectedLetters: string[] = [];

  private allWords: Word[] = WORDS.map(word => {
    return {
      original: word,
      letters: shuffle<string>(word.split(''))
    };
  });
  private currentWordIndex = 0;

  constructor() {
  }

  get allWordsCount() {
    return this.allWords.length;
  }

  get currentWordNumber() {
    return this.currentWordIndex + 1;
  }

  deselectLetter(letter: string) {
    this.currentWord?.letters.push(letter);
    this.selectedLetters.splice(this.selectedLetters.indexOf(letter), 1);
  }

  isCurrentWordGuessed() {
    return this.currentWord?.original === this.selectedLetters.join('');
  }

  nextWord(increment: boolean = true) {
    if (this.currentWordIndex === this.allWords.length - 1) {
      return false;
    }

    if (increment) {
      this.currentWordIndex++;
    }
    this.currentWord = this.allWords[this.currentWordIndex];
    this.selectedLetters = [];

    return true;
  }

  selectLetter(letter: string) {
    this.selectedLetters.push(letter);
    this.currentWord?.letters.splice(this.currentWord.letters.indexOf(letter), 1);
  }

  /**
   * Randomize words on the beginning
   */
  start() {
    shuffle<Word>(this.allWords);
    this.nextWord(false);
  }
}
