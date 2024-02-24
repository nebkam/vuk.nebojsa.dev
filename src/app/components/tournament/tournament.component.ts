import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {randomElement} from "../../lib/array";
import {RandomWordFactoryService} from "../../services/random-word-factory.service";
import {RandomSentenceFactoryService} from "../../services/random-sentence-factory.service";
import {SpellingComponent} from "../spelling/spelling.component";
import {SentenceBuildingComponent} from "../sentence-building/sentence-building.component";
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {merge} from "rxjs";

enum Stage {
  Start,
  Playing,
  End
}

enum Type {
  Spelling,
  SentenceBuilding
}

@Component({
  selector: 'app-tournament',
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
    SpellingComponent,
  ],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css'
})
export class TournamentComponent {
  Stage = Stage;
  Type = Type;

  stage = Stage.Start;
  totalPoints = 0;
  type = randomElement([Type.Spelling, Type.SentenceBuilding]);

  constructor(
    public wordFactory: RandomWordFactoryService,
    public sentenceFactory: RandomSentenceFactoryService
  ) {
    merge(this.sentenceFactory.points$, this.wordFactory.points$).subscribe(points => {
      this.totalPoints += points;
      if (this.totalPoints < 0) {
        this.totalPoints = 0;
      }
    });
    //TODO unsub
  }

  start() {
    this.stage = Stage.Playing;
  }

  next() {
    this.type = randomElement([Type.Spelling, Type.SentenceBuilding]);
    switch (this.type) {
      case Type.Spelling:
        this.wordFactory.randomWord();
        break;
      case Type.SentenceBuilding:
        this.sentenceFactory.randomSentence();
        break;
    }
  }

  end() {
    this.stage = Stage.End;
  }
}
