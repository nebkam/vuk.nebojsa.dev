import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatAnchor, MatIconAnchor} from "@angular/material/button";
import {SoundToggleComponent} from "./components/sound-toggle/sound-toggle.component";
import {CustomMatIconRegistryService} from "./services/custom-mat-icon-registry.service";
import {FeedbackService} from "./services/feedback.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatAnchor,
    MatIcon,
    MatIconAnchor,
    MatListItem,
    MatListItemIcon,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    RouterLink,
    RouterOutlet,
    SoundToggleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('successSound', {static: true}) successSound!: ElementRef<HTMLAudioElement>;
  title = 'vuk';

  constructor(
    private customMatIconRegistry: CustomMatIconRegistryService,
    private feedback: FeedbackService
  ) {
  }

  ngOnInit() {
    this.feedback.init(this.successSound);
  }
}
