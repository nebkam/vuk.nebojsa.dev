import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FeedbackService} from "../../services/feedback.service";

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
  constructor(public feedback: FeedbackService) {
  }
}
