import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GuessTheLetterComponent} from "./guess-the-letter/guess-the-letter.component";
import {WordSpellingComponent} from "./word-spelling/word-spelling.component";
import {GuessTheSentenceComponent} from "./guess-the-sentence/guess-the-sentence.component";

export const routes: Routes = [
  // BC
  {
    path: 'slovo-po-slovo', redirectTo: 'slozi-rec'
  },

  {
    path: 'pogodi-slovo', component: GuessTheLetterComponent
  }, {
    path: 'slozi-recenicu', component: GuessTheSentenceComponent
  }, {
    path: 'slozi-rec', component: WordSpellingComponent
  }, {
    path: '', component: HomeComponent
  }];
