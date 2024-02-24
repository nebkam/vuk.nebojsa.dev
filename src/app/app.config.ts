import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {HttpClientModule} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId": "vuknebojsadev",
      "appId": "1:198678641319:web:c555b55f573dc514403982",
      "storageBucket": "vuknebojsadev.appspot.com",
      "apiKey": "AIzaSyBMv2DFsNkIZvhNdjPTGoJwQA4yrjH1ZKk",
      "authDomain": "vuknebojsadev.firebaseapp.com",
      "messagingSenderId": "198678641319"
    }))),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
