import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton, MatFabButton} from "@angular/material/button";
import {shuffle} from "../array";
import {MatIcon} from "@angular/material/icon";
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
    MatCardContent,
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './word-spelling.component.html',
  styleUrl: './word-spelling.component.css'
})
export class WordSpellingComponent {
  @ViewChild('wordSound', {static: false}) wordSound!: ElementRef<HTMLAudioElement>;

  Stage = Stage;
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

  constructor(private sound: SoundService) {
  }

  start() {
    this.stage = Stage.Playing;
    shuffle<Word>(this.words);
    this.showNextWord(false);
  }

  end() {
    this.stage = Stage.End;
  }

  playWordSound() {
    if (!this.sound.isMuted()) {
      // noinspection JSIgnoredPromiseFromCall
      this.wordSound.nativeElement.play();
    }
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
  }
}
