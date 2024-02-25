import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {GuessTheLetterComponent} from "./components/guess-the-letter/guess-the-letter.component";
import {TournamentComponent} from "./components/tournament/tournament.component";
import {GuessTheWord2Component} from "./components/guess-the-word2/guess-the-word2.component";
import {GuessTheSentence2Component} from "./components/guess-the-sentence2/guess-the-sentence2.component";

export const routes: Routes = [
  // BC
  {
    path: 'slovo-po-slovo', redirectTo: 'slozi-rec'
  },

  {
    path: 'pogodi-slovo', component: GuessTheLetterComponent
  }, {
    path: 'slozi-recenicu', component: GuessTheSentence2Component
  }, {
    path: 'slozi-rec', component: GuessTheWord2Component
  }, {
    path: 'takmicenje', component: TournamentComponent
  }, {
    path: '', component: HomeComponent
  }];
