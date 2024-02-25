import { Injectable } from '@angular/core';
import {SelectedWord, SentenceFactory, Word} from "./sentence-factory";
import {BehaviorSubject, filter, Observable, tap} from "rxjs";
import {FeedbackService} from "./feedback.service";
import SENTENCES from '../../assets/sentences/sentences.json';
import {sentenceToWords} from "../lib/words";
import {shuffle} from "../lib/array";

@Injectable({
  providedIn: 'root'
})
export class StaticSentenceFactoryService implements SentenceFactory {
  private readonly allSentences: string[];
  private success = new BehaviorSubject(false);

  selectedWords: SelectedWord[] = [];
  sentence: string | null = null;
  sentenceIndex: number;
  success$: Observable<boolean> = this.success.asObservable();
  words: Word[] = [];

  constructor(private feedback: FeedbackService) {
    this.allSentences = SENTENCES;
    this.sentenceIndex = 0;
    this.success$
      .pipe(
        filter(Boolean),
        tap(() => this.feedback.success())
      ).subscribe();
  }

  get total(): number {
    return this.allSentences.length;
  }

  advance(): boolean {
    if (this.sentenceIndex === this.allSentences.length - 1) {
      return false;
    }
    this.sentenceIndex++;
    this.setSentence();

    return true;
  }

  deselect(selectedWord:SelectedWord, index: number): void {
    this.selectedWords.splice(index, 1);
    this.words[selectedWord.index].selected = false;
    this.success.next(false);
  }

  start(): void {
    shuffle(this.allSentences);
    this.sentenceIndex = 0;
    this.setSentence();
  }

  select(word: Word, index: number): void {
    word.selected = true;
    this.selectedWords.push({value: word.value, index});
    this.success.next(this.isCurrentSentenceGuessed());
  }

  private setSentence() {
    this.sentence = this.allSentences[this.sentenceIndex];
    this.words = sentenceToWords(this.sentence);
    shuffle(this.words);
    this.selectedWords = [];
    this.success.next(false);
  }

  private isCurrentSentenceGuessed() {
    return this.sentence === this.selectedWords.map(selectedWord => selectedWord.value).join(' ');
  }
}
