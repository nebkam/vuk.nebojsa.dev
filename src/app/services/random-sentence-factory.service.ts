import {Injectable} from '@angular/core';
import {Sentence, SentenceFactory} from "./sentence-factory";
import {BehaviorSubject, filter, tap} from "rxjs";
import SENTENCES from "../../assets/sentences/sentences.json";
import {shuffle} from "../lib/array";
import {FeedbackService} from "./feedback.service";

@Injectable({
  providedIn: 'root'
})
export class RandomSentenceFactoryService implements SentenceFactory {
  private allSentences: Sentence[] = SENTENCES.map(sentence => {
    return {
      original: sentence,
      words: sentence.split(' ')
    };
  });
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
    this.randomSentence();
  }

  deselectWord(word: string): void {
    this.currentSentence?.words.push(word);
    this.selectedWords.splice(this.selectedWords.indexOf(word), 1);
    this.success.next(false);
  }

  randomSentence() {
    shuffle<Sentence>(this.allSentences);
    this.currentSentence = this.allSentences[0];
    shuffle<string>(this.currentSentence.words);
    this.selectedWords = [];
    this.success.next(false);
  }

  selectWord(word: string): void {
    this.selectedWords.push(word);
    this.currentSentence?.words.splice(this.currentSentence?.words.indexOf(word), 1);
    this.success.next(this.isCurrentSentenceGuessed());
  }

  private isCurrentSentenceGuessed() {
    return this.currentSentence?.original === this.selectedWords.join(' ');
  }
}
