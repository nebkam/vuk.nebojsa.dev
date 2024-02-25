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
import {SentenceBuilding2Component} from "../sentence-building2/sentence-building2.component";
import {StaticSentenceFactory2Service} from "../../services/static-sentence-factory2.service";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-guess-the-sentence2',
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
    SentenceBuilding2Component,
  ],
  templateUrl: './guess-the-sentence2.component.html',
  styleUrl: './guess-the-sentence2.component.css'
})
export class GuessTheSentence2Component {
  Stage = Stage;
  stage = Stage.Start;

  constructor(public sentenceFactory: StaticSentenceFactory2Service) {
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
