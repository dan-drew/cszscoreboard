import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { BoothViewComponent } from './booth/booth-view/booth-view.component';
import { LiveViewComponent } from './live/live-view/live-view.component';
import { RoundsComponent } from './rounds/rounds.component';
import { RoundNameDirective } from './round-name.directive';
import { RoundNamesDirective } from './round-names.directive';
import { SidebarComponent } from './booth/sidebar/sidebar.component';
import { GuessEditorComponent } from './booth/guess-editor/guess-editor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GuessSelectorComponent } from './booth/guess-selector/guess-selector.component';
import { MatchEditorComponent } from './booth/match-editor/match-editor.component';
import { ButtonGroupComponent } from './booth/button-group/button-group.component';
import { ButtonGroupItemDirective } from './booth/button-group/button-group-item.directive';
import { RoundNamesComponent } from './round-names/round-names.component';
import { OptionalScoreComponent } from './live/optional-score/optional-score.component';
import { LiveSlateComponent } from './live/live-slate/live-slate.component';
import { LiveScoreboardComponent } from './live/live-scoreboard/live-scoreboard.component';
import { LiveGuessesComponent } from './live/live-guesses/live-guesses.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    BoothViewComponent,
    LiveViewComponent,
    RoundsComponent,
    RoundNameDirective,
    RoundNamesDirective,
    SidebarComponent,
    GuessEditorComponent,
    GuessSelectorComponent,
    MatchEditorComponent,
    ButtonGroupComponent,
    ButtonGroupItemDirective,
    RoundNamesComponent,
    OptionalScoreComponent,
    LiveSlateComponent,
    LiveScoreboardComponent,
    LiveGuessesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
