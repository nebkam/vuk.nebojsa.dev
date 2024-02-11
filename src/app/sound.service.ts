import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  isMuted() {
    return Boolean(this.storage.getItem('mute'));
  }

  mute() {
    this.storage.setItem('mute', 'yes');
  }

  unmute() {
    this.storage.removeItem('mute');
  }
}
