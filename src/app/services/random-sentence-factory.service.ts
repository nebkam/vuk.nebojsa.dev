import {Injectable} from '@angular/core';
import {SelectedWord, SentenceFactory, Word} from "./sentence-factory";
import {BehaviorSubject, filter, Observable, tap} from "rxjs";
import {FeedbackService} from "./feedback.service";
import SENTENCES from "../../assets/sentences/sentences.json";
import {sentenceToWords} from "../lib/words";
import {shuffle} from "../lib/array";

@Injectable({
  providedIn: 'root'
})
export class RandomSentenceFactoryService implements SentenceFactory {
  private readonly allSentences: string[];
  private points = new BehaviorSubject(0);
  private success = new BehaviorSubject(false);

  points$ = this.points.asObservable();
  sentence: string | null = null;
  selectedWords: SelectedWord[] = [];
  success$: Observable<boolean> = this.success.asObservable();
  words: Word[] = [];

  constructor(private feedback: FeedbackService) {
    this.allSentences = SENTENCES;
    this.success$
      .pipe(
        filter(Boolean),
        tap(() => this.feedback.success())
      ).subscribe();
    this.advance();
  }

  get total(): number {
    return this.allSentences.length;
  }

  advance(): boolean {
    shuffle(this.allSentences);
    this.setSentence();

    return true;
  }

  deselect(selectedWord: SelectedWord, index: number): void {
    this.selectedWords.splice(index, 1);
    this.words[selectedWord.index].selected = false;
    this.success.next(false);
  }

  select(word: Word, index: number): void {
    word.selected = true;
    this.selectedWords.push({value: word.value, index});
    this.points.next(this.doesCurrentSentenceStartWithSelectedWords() ? 1 : -1);
    this.success.next(this.isCurrentSentenceGuessed());
  }

  start(): void {
  }

  private setSentence() {
    this.sentence = JSON.parse(JSON.stringify(this.allSentences[0])) as string; // deep copy
    this.words = sentenceToWords(this.sentence);
    shuffle(this.words);
    this.selectedWords = [];
    this.success.next(false);
  }

  private doesCurrentSentenceStartWithSelectedWords(): boolean {
    return this.sentence?.startsWith(this.selectedWords.map(selectedWord => selectedWord.value).join(' ')) ?? false;
  }

  private isCurrentSentenceGuessed() {
    return this.sentence === this.selectedWords.map(selectedWord => selectedWord.value).join(' ');
  }
}
