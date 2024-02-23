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
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {StaticWordFactoryService} from "../shared/static-word-factory.service";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-guess-the-word',
  standalone: true,
  imports: [
    AsyncPipe,
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
  templateUrl: './guess-the-word.component.html',
  styleUrl: './guess-the-word.component.css'
})
export class GuessTheWordComponent {
  @ViewChild('wordSound', {static: false}) wordSound!: ElementRef<HTMLAudioElement>;

  Stage = Stage;
  stage = Stage.Start;

  constructor(
    public wordFactory: StaticWordFactoryService
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
