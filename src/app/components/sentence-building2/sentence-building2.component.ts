import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {SentenceFactory} from "../../services/sentence-factory";

@Component({
  selector: 'app-sentence-building2',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './sentence-building2.component.html',
  styleUrl: './sentence-building2.component.css'
})
export class SentenceBuilding2Component {
  @ViewChild('sentenceSound', {static: false}) sentenceSound!: ElementRef<HTMLAudioElement>;
  @Input() sentenceFactory!: SentenceFactory;

  playSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.sentenceSound.nativeElement.play();
  }
}
