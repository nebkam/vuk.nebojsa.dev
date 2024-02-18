import {ElementRef, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackBarComponent} from "./custom-snack-bar/custom-snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private successSound!: ElementRef<HTMLAudioElement>;
  private storage: Storage;

  constructor(private snackBar: MatSnackBar) {
    this.storage = window.localStorage;
  }

  init(successSound: ElementRef<HTMLAudioElement>) {
    this.successSound = successSound;
  }

  isSoundMuted() {
    return Boolean(this.storage.getItem('mute'));
  }

  muteSound() {
    this.storage.setItem('mute', 'yes');
  }

  success() {
    if (!this.isSoundMuted()) {
      // noinspection JSIgnoredPromiseFromCall
      this.successSound.nativeElement.play();
    }
    this.snackBar.openFromComponent(CustomSnackBarComponent, { duration: 800 });
  }

  unmuteSound() {
    this.storage.removeItem('mute');
  }
}
