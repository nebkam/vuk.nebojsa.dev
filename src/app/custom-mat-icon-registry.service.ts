import { Injectable } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Injectable({
  providedIn: 'root'
})
export class CustomMatIconRegistryService {
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIcon(
      'wolf',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/wolf.svg')
    );
  }
}
