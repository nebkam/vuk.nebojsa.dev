import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {WordFactory2} from "../../services/word-factory2";

@Component({
  selector: 'app-spelling2',
  standalone: true,
  imports: [
    MatButton,
    MatDivider,
    MatFabButton,
    MatIcon,
    NgForOf,
  ],
  templateUrl: './spelling2.component.html',
  styleUrl: './spelling2.component.css'
})
export class Spelling2Component {
  @ViewChild('wordSound', {static: false}) wordSound!: ElementRef<HTMLAudioElement>;
  @Input() wordFactory!: WordFactory2;

  playSound() {
    // noinspection JSIgnoredPromiseFromCall
    this.wordSound.nativeElement.play();
  }
}
