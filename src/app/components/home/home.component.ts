import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly loaders = [
    '6e9c1e74597569.5c34d66faeedb.gif',
    '6e883174597569.5c34d66fae70d.gif',
    '8ff8db74597569.5c34d66faf4dd.gif',
    '9cbb6874597569.5c34d66fafc69.gif',
    '323a4974597569.5c34d66faeb11.gif',
    '485f3174597569.5c44ad563adc0.gif',
    '15055674597569.5c34d66faf1ed.gif',
    'c6568274597569.5c34d66fb0015.gif',
    'ca9f2274597569.5c34d66faf8c0.gif',
    'ec448674597569.5c34d66fb0229.gif'
  ];
  loader: string;

  constructor() {
    this.loader = this.loaders[Math.floor(Math.random() * this.loaders.length)];
  }
}
