import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {randomElement} from "../../lib/array";
import {RandomWordFactoryService} from "../../services/random-word-factory.service";
import {RandomSentenceFactoryService} from "../../services/random-sentence-factory.service";
import {SpellingComponent} from "../spelling/spelling.component";
import {SentenceBuildingComponent} from "../sentence-building/sentence-building.component";

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
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
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
  type = randomElement([Type.Spelling, Type.SentenceBuilding]);

  constructor(
    public wordFactory: RandomWordFactoryService,
    public sentenceFactory: RandomSentenceFactoryService
  ) {
  }

  start() {
    this.stage = Stage.Playing;
  }
}
