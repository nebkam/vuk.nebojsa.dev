import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {WordFactoryService} from "../shared/word-factory.service";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-word-spelling',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
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
  stage = Stage.Start;

  constructor(
    public wordFactory: WordFactoryService
  ) {
  }

  advance() {
    this.wordFactory.nextWord() || this.end();
  }

  end() {
    this.stage = Stage.End;
  }

  playWordSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.wordSound.nativeElement.play();
  }

  start() {
    this.stage = Stage.Playing;
    this.wordFactory.start();
  }
}
