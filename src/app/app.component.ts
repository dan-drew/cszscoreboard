import { Component } from '@angular/core';
import {match, Match} from "./config/match";
import {config, Configuration} from "./config/configuration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: Match, useValue: match },
    { provide: Configuration, useValue: config }
  ]
})
export class AppComponent {
  title = 'cszscoreboard';
}
