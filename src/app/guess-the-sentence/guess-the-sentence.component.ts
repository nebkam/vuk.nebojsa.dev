import { Component } from '@angular/core';
import {SentenceFactoryService} from "../shared/sentence-factory.service";

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

  constructor(public sentenceFactory: SentenceFactoryService) {
    console.log(sentenceFactory);
  }
}
