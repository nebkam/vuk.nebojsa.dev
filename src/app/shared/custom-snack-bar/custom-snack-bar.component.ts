import { Component } from '@angular/core';
import {MatSnackBarLabel} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [
    MatIcon,
    MatSnackBarLabel,
  ],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.css'
})
export class CustomSnackBarComponent {

}
