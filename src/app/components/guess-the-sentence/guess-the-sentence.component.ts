import {Component} from '@angular/core';
import {StaticSentenceFactoryService} from "../../services/static-sentence-factory.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe} from "@angular/common";
import {SentenceBuildingComponent} from "../sentence-building/sentence-building.component";

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
    MatIcon,
    SentenceBuildingComponent,
  ],
  templateUrl: './guess-the-sentence.component.html',
  styleUrl: './guess-the-sentence.component.css'
})
export class GuessTheSentenceComponent {
  Stage = Stage;
  stage = Stage.Start;

  constructor(public sentenceFactory: StaticSentenceFactoryService) {
  }

  advance() {
    this.sentenceFactory.nextSentence() || this.end();
  }

  end() {
    this.stage = Stage.End;
  }

  start() {
    this.stage = Stage.Playing;
    this.sentenceFactory.start();
  }
}
