import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private successSound!: ElementRef<HTMLAudioElement>;
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  init(successSound: ElementRef<HTMLAudioElement>) {
    this.successSound = successSound;
  }

  isMuted() {
    return Boolean(this.storage.getItem('mute'));
  }

  mute() {
    this.storage.setItem('mute', 'yes');
  }

  playSuccessSound() {
    if (!this.isMuted()) {
      // noinspection JSIgnoredPromiseFromCall
      this.successSound.nativeElement.play();
    }
  }

  unmute() {
    this.storage.removeItem('mute');
  }
}
