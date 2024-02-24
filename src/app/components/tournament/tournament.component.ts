import {Component, inject} from '@angular/core';
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
import {RandomSentenceFactoryService} from "../../services/random-sentence-factory.service";
import {SpellingComponent} from "../spelling/spelling.component";
import {SentenceBuildingComponent} from "../sentence-building/sentence-building.component";
import {AsyncPipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {merge, Observable} from "rxjs";
import {MatDivider} from "@angular/material/divider";
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTextColumn} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Spelling2Component} from "../spelling2/spelling2.component";
import {RandomWordFactory2Service} from "../../services/random-word-factory2.service";

interface UserScore {
  name: string | null;
  points: number;
  when: Date;
}

enum Stage {
  Start,
  Playing,
  EnterScore,
  ShowHighScores
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
    MatDivider,
    MatFormField,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatTable,
    MatTextColumn,
    ReactiveFormsModule,
    SentenceBuildingComponent,
    SpellingComponent,
    Spelling2Component,
  ],
  templateUrl: './tournament.component.html',
  styleUrl: './tournament.component.css'
})
export class TournamentComponent {
  Stage = Stage;
  Type = Type;

  columnsToDisplay = ['name', 'points'];
  firestore: Firestore = inject(Firestore);
  nameFormControl = new FormControl('');
  scores$: Observable<UserScore[]>;
  stage = Stage.Start;
  totalPoints = 0;
  type = randomElement([Type.Spelling, Type.SentenceBuilding]);

  constructor(
    public wordFactory: RandomWordFactory2Service,
    public sentenceFactory: RandomSentenceFactoryService,
    private snackBar: MatSnackBar
  ) {
    merge(this.sentenceFactory.points$, this.wordFactory.points$).subscribe(points => {
      this.totalPoints += points;
      if (this.totalPoints < 0) {
        this.totalPoints = 0;
      }
    });
    //TODO unsub

    const collectionReference = collection(this.firestore, 'scores');
    this.scores$ = collectionData(collectionReference) as Observable<UserScore[]>;
  }

  start() {
    this.stage = Stage.Playing;
  }

  showHighScores() {
    this.stage = Stage.ShowHighScores;
  }

  next() {
    this.type = randomElement([Type.Spelling, Type.SentenceBuilding]);
    switch (this.type) {
      case Type.Spelling:
        this.wordFactory.advance();
        break;
      case Type.SentenceBuilding:
        this.sentenceFactory.randomSentence();
        break;
    }
  }

  end() {
    if (this.totalPoints > 0) {
      this.stage = Stage.EnterScore;
    } else {
      this.stage = Stage.ShowHighScores;
    }
  }

  saveScore() {
    const score: UserScore = {name: this.nameFormControl.value, points: this.totalPoints, when: new Date()};
    const collectionReference = collection(this.firestore, 'scores');
    addDoc(collectionReference, score)
      .then(() => {
        this.stage = Stage.ShowHighScores;
        this.snackBar.open('Сачувано!', undefined, {duration: 800});
      });
  }
}
