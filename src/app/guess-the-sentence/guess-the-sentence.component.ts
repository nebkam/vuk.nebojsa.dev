import { Component } from '@angular/core';
import {SentenceGuessingService} from "../shared/sentence-guessing.service";

enum Stage {
  Start,
  Playing,
  End
}

@Component({
  selector: 'app-guess-the-sentence',
  standalone: true,
  imports: [],
  templateUrl: './guess-the-sentence.component.html',
  styleUrl: './guess-the-sentence.component.css'
})
export class GuessTheSentenceComponent {
  Stage = Stage;
  stage = Stage.Start;

  constructor(public sentenceGuessing: SentenceGuessingService) {
    console.log(sentenceGuessing);
  }
}
