import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { BoothViewComponent } from './booth-view/booth-view.component';
import { LiveViewComponent } from './live-view/live-view.component';
import { RoundsComponent } from './rounds/rounds.component';
import { RoundNameDirective } from './round-name.directive';
import { RoundNamesDirective } from './round-names.directive';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GuessEditorComponent } from './guess-editor/guess-editor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GuessSelectorComponent } from './guess-selector/guess-selector.component';
import { MatchEditorComponent } from './match-editor/match-editor.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { ButtonGroupItemDirective } from './button-group/button-group-item.directive';

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
    ButtonGroupItemDirective
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
