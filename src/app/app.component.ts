import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatListItem, MatListItemIcon, MatNavList} from "@angular/material/list";
import {MatAnchor, MatIconAnchor} from "@angular/material/button";
import {SoundToggleComponent} from "./components/sound-toggle/sound-toggle.component";
import {CustomMatIconRegistryService} from "./services/custom-mat-icon-registry.service";
import {FeedbackService} from "./services/feedback.service";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

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
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('successSound', {static: true}) successSound!: ElementRef<HTMLAudioElement>;
  firestore: Firestore = inject(Firestore);
  scores$: Observable<any[]>;
  title = 'vuk';

  constructor(
    private customMatIconRegistry: CustomMatIconRegistryService,
    private feedback: FeedbackService
  ) {
    const aCollection = collection(this.firestore, 'scores');
    this.scores$ = collectionData(aCollection);
  }

  ngOnInit() {
    this.feedback.init(this.successSound);
  }
}
