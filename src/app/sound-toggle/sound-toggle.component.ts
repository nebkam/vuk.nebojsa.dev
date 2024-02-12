import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {SoundService} from "../sound.service";

@Component({
  selector: 'app-sound-toggle',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './sound-toggle.component.html',
  styleUrl: './sound-toggle.component.css'
})
export class SoundToggleComponent {
  constructor(public sound: SoundService) {
  }
}
