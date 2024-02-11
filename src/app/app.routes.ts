import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LettersComponent} from "./letters/letters.component";

export const routes: Routes = [{
  path: 'slova', component: LettersComponent
}, {
  path: '', component: HomeComponent
}];
