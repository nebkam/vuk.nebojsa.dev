import { Injectable } from '@angular/core';
import SENTENCES from '../../assets/sentences/sentences.json';
import {shuffle} from "./array";

interface Sentence {
  original: string;
  words: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SentenceFactoryService {
  currentSentence: Sentence | null = null;
  selectedWords: string[] = [];
  private allSentences: Sentence[] = SENTENCES.map(sentence => {
    return {
      original: sentence,
      words: shuffle<string>(sentence.split(' '))
    };
  });
  private currentSentenceIndex = 0;

  constructor() { }

  get allSentencesCount() {
    return this.allSentences.length;
  }

  get currentSentenceNumber() {
    return this.currentSentenceIndex + 1;
  }

  deselectWord(word: string) {
    this.currentSentence?.words.push(word);
    this.selectedWords.splice(this.selectedWords.indexOf(word), 1);
  }

  isCurrentSentenceGuessed() {
    return this.currentSentence?.original === this.selectedWords.join(' ');
  }

  nextSentence(increment: boolean = true) {
    if (this.currentSentenceIndex === this.allSentences.length - 1) {
      return false;
    }

    if (increment) {
      this.currentSentenceIndex++;
    }
    this.currentSentence = this.allSentences[this.currentSentenceIndex];
    this.selectedWords = [];

    return true;
  }

  selectWord(word: string) {
    this.selectedWords.push(word);
    this.currentSentence?.words.splice(this.currentSentence?.words.indexOf(word), 1);
  }

  start() {
    shuffle<Sentence>(this.allSentences);
    this.nextSentence(false);
  }
}
