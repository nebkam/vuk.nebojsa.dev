import { Injectable } from '@angular/core';
import words from '../assets/words/words.json';
console.log(words);

@Injectable({
  providedIn: 'root'
})
export class SpellingService {

  constructor() {

  }
}
