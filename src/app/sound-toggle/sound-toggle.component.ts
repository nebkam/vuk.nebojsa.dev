import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {SoundService} from "../sound.service";

@Component({
  selector: 'app-sound-toggle',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './sound-toggle.component.html',
  styleUrl: './sound-toggle.component.css'
})
export class SoundToggleComponent {
  constructor(public sound: SoundService) {
  }
}
