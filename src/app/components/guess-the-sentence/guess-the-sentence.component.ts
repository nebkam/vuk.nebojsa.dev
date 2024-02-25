import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {SentenceBuildingComponent} from "../sentence-building/sentence-building.component";
import {StaticSentenceFactoryService} from "../../services/static-sentence-factory.service";

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
    this.sentenceFactory.advance() || this.end();
  }

  end() {
    this.stage = Stage.End;
  }

  start() {
    this.stage = Stage.Playing;
    this.sentenceFactory.start();
  }
}
