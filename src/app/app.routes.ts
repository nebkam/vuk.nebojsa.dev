import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GuessTheLetterComponent} from "./quess-the-letter/guess-the-letter.component";
import {WordSpellingComponent} from "./word-spelling/word-spelling.component";

export const routes: Routes = [{
  path: 'pogodi-slovo', component: GuessTheLetterComponent
},{
  path: 'slovo-po-slovo', component: WordSpellingComponent
}, {
  path: '', component: HomeComponent
}];
