import {Component} from '@angular/core';
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
import {StaticWordFactoryService} from "../../services/static-word-factory.service";
import {SpellingComponent} from "../spelling/spelling.component";

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
    MatIcon,
    SpellingComponent,
  ],
  templateUrl: './guess-the-word.component.html',
  styleUrl: './guess-the-word.component.css'
})
export class GuessTheWordComponent {

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

  start() {
    this.stage = Stage.Playing;
    this.wordFactory.start();
  }
}
