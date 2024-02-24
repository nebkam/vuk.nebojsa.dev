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
import {Spelling2Component} from "../spelling2/spelling2.component";
import {StaticWordFactory2Service} from "../../services/static-word-factory2.service";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-guess-the-word2',
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
    Spelling2Component,
  ],
  templateUrl: './guess-the-word2.component.html',
  styleUrl: './guess-the-word2.component.css'
})
export class GuessTheWord2Component {
  Stage = Stage;
  stage = Stage.Start;

  constructor(
    public wordFactory: StaticWordFactory2Service
  ) {
  }

  advance() {
    this.wordFactory.advance() || this.end();
  }

  end() {
    this.stage = Stage.End;
  }

  start() {
    this.stage = Stage.Playing;
    this.wordFactory.start();
  }
}
