import {Injectable} from '@angular/core';
import SENTENCES from '../../assets/sentences/sentences.json';
import {shuffle} from "./array";
import {FeedbackService} from "./feedback.service";
import {BehaviorSubject, filter, tap} from "rxjs";

interface Sentence {
  original: string;
  words: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SentenceFactoryService {
  private allSentences: Sentence[] = SENTENCES.map(sentence => {
    return {
      original: sentence,
      words: shuffle<string>(sentence.split(' '))
    };
  });
  private currentSentenceIndex = 0;
  private success = new BehaviorSubject(false);

  currentSentence: Sentence | null = null;
  selectedWords: string[] = [];
  success$ = this.success.asObservable();

  constructor(private feedback: FeedbackService) {
    this.success$
      .pipe(
        filter(Boolean),
        tap(() => this.feedback.success())
      ).subscribe();
  }

  get allSentencesCount() {
    return this.allSentences.length;
  }

  get currentSentenceNumber() {
    return this.currentSentenceIndex + 1;
  }

  deselectWord(word: string) {
    this.currentSentence?.words.push(word);
    this.selectedWords.splice(this.selectedWords.indexOf(word), 1);
    this.success.next(false);
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
    this.success.next(false);

    return true;
  }

  selectWord(word: string) {
    this.selectedWords.push(word);
    this.currentSentence?.words.splice(this.currentSentence?.words.indexOf(word), 1);
    this.success.next(this.isCurrentSentenceGuessed());
  }

  start() {
    shuffle<Sentence>(this.allSentences);
    this.nextSentence(false);
  }

  private isCurrentSentenceGuessed() {
    return this.currentSentence?.original === this.selectedWords.join(' ');
  }
}
