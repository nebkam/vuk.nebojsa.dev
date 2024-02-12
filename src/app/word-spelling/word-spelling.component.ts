import { Component } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-word-spelling',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './word-spelling.component.html',
  styleUrl: './word-spelling.component.css'
})
export class WordSpellingComponent {

}
