import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {shuffle} from "../array";
import {NgIf} from "@angular/common";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-letters',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
  ],
  templateUrl: './letters.component.html',
  styleUrl: './letters.component.css'
})
export class LettersComponent {
  letter = '';
  letterIndex = 0;
  misses: string[] = [];
  points = 0;
  stage = Stage.Start;

  private readonly letters = [
    'А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н',
    'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш'
  ];
  Stage = Stage;

  @ViewChild('successSound', {static: true}) successSound!: ElementRef<HTMLAudioElement>;

  constructor() {
  }

  start() {
    this.stage = Stage.Playing;
    shuffle(this.letters);
    this.showNextLetter(false);
  }

  markAsCorrect() {
    this.playSuccessSound();
    this.points++;
    this.showNextLetter();
  }

  markAsFalse() {
    this.misses.push(this.letters[this.letterIndex]);
    this.showNextLetter();
  }

  end() {
    this.stage = Stage.End;
  }

  private playSuccessSound(){
    // noinspection JSIgnoredPromiseFromCall
    this.successSound.nativeElement.play();
  }

  private showNextLetter(increment: boolean = true) {
    if (this.letterIndex === this.letters.length - 1) {
      this.end();
      return;
    }

    if (increment) {
      this.letterIndex++;
    }
    this.letter = this.letters[this.letterIndex];
  }

  isMaximum(): boolean {
    return this.points === this.letters.length;
  }
}
