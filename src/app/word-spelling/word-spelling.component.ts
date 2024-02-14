import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton, MatFabButton} from "@angular/material/button";
import {shuffle} from "../array";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {SoundService} from "../sound.service";

enum Stage {
  Start,
  Playing,
  End
}

interface Word {
  original: string;
  letters: string[];
  sound: string;
}

const WORDS = [
  "девојка",
  "звезда",
  "ливада",
  "мама",
  "мачка",
  "океан",
  "пролеће",
  "срећа",
  "љубав",
  "љубазно"
];

@Component({
  selector: 'app-word-spelling',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatDivider,
    MatFabButton,
    MatIcon,
    NgForOf,
  ],
  templateUrl: './word-spelling.component.html',
  styleUrl: './word-spelling.component.css'
})
export class WordSpellingComponent {
  @ViewChild('wordSound', {static: false}) wordSound!: ElementRef<HTMLAudioElement>;

  Stage = Stage;
  selectedLetters: string[] = [];
  stage = Stage.Start;
  wordIndex = 0;
  words: Word[] = WORDS.map(word => {
    return {
      original: word,
      letters: shuffle<string>(word.split('')),
      sound: `${word}.mp3`
    };
  });
  word: Word | null = null;

  constructor(public sound: SoundService) {
  }

  deselectLetter(letter: string) {
    this.word?.letters.push(letter);
    this.selectedLetters.splice(this.selectedLetters.indexOf(letter), 1);
  }

  end() {
    this.stage = Stage.End;
  }

  isCorrect() {
    return this.word?.original === this.selectedLetters.join('');
  }

  next() {
    this.showNextWord();
  }

  playWordSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.wordSound.nativeElement.play();
  }

  selectLetter(letter: string) {
    this.selectedLetters.push(letter);
    this.word?.letters.splice(this.word.letters.indexOf(letter), 1);
  }

  start() {
    this.stage = Stage.Playing;
    shuffle<Word>(this.words);
    this.showNextWord(false);
  }

  private showNextWord(increment: boolean = true) {
    if (this.wordIndex === this.words.length - 1) {
      this.end();
      return;
    }

    if (increment) {
      this.wordIndex++;
    }
    this.word = this.words[this.wordIndex];
    this.selectedLetters = [];
  }
}
