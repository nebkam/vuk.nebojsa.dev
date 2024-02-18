import {Component, ElementRef, ViewChild} from '@angular/core';
import {SentenceFactoryService} from "../shared/sentence-factory.service";
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

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-guess-the-sentence',
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
  templateUrl: './guess-the-sentence.component.html',
  styleUrl: './guess-the-sentence.component.css'
})
export class GuessTheSentenceComponent {
  @ViewChild('sentenceSound', {static: false}) sentenceSound!: ElementRef<HTMLAudioElement>;

  Stage = Stage;
  stage = Stage.Start;

  constructor(public sentenceFactory: SentenceFactoryService) {
  }

  advance() {
    this.sentenceFactory.nextSentence() || this.end();
  }

  end() {
    this.stage = Stage.End;
  }

  playSentenceSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.sentenceSound.nativeElement.play();
  }

  start() {
    this.stage = Stage.Playing;
    this.sentenceFactory.start();
  }
}
