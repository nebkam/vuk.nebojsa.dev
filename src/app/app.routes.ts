import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {GuessTheLetterComponent} from "./quess-the-letter/guess-the-letter.component";

export const routes: Routes = [{
  path: 'pogodi-slovo', component: GuessTheLetterComponent
}, {
  path: '', component: HomeComponent
}];
