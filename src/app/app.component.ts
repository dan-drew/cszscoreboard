import { Component } from '@angular/core';
import {Match} from "./config/match";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Match.provider]
})
export class AppComponent {
}
