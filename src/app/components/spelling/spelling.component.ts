import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {WordFactory} from "../../services/word-factory";

@Component({
  selector: 'app-spelling',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatFabButton,
    MatIcon,
    NgForOf,
  ],
  templateUrl: './spelling.component.html',
  styleUrl: './spelling.component.css'
})
export class SpellingComponent {
  @ViewChild('wordSound', {static: false}) wordSound!: ElementRef<HTMLAudioElement>;
  @Input() wordFactory!: WordFactory;

  playSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.wordSound.nativeElement.play();
  }
}
