import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {shuffle} from "../shared/array";
import {FeedbackService} from "../shared/feedback.service";
import {MatIcon} from "@angular/material/icon";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-guess-the-letter',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatIcon,
  ],
  templateUrl: './guess-the-letter.component.html',
  styleUrl: './guess-the-letter.component.css'
})
export class GuessTheLetterComponent {
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

  constructor(private feedback: FeedbackService) {
  }

  start() {
    this.stage = Stage.Playing;
    shuffle<string>(this.letters);
    this.showNextLetter(false);
  }

  markAsCorrect() {
    this.feedback.success();
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
