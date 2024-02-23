import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {SentenceFactory} from "../../services/sentence-factory";

@Component({
  selector: 'app-sentence-building',
  standalone: true,
    imports: [
        MatButton,
        MatDivider,
        MatFabButton,
        MatIcon,
        NgForOf
    ],
  templateUrl: './sentence-building.component.html',
  styleUrl: './sentence-building.component.css'
})
export class SentenceBuildingComponent {
  @ViewChild('sentenceSound', {static: false}) sentenceSound!: ElementRef<HTMLAudioElement>;
  @Input() sentenceFactory!: SentenceFactory;

  playSentenceSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.sentenceSound.nativeElement.play();
  }
}