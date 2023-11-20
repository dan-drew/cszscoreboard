import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './common/score/score.component';
import { BoothViewComponent } from './booth/booth-view/booth-view.component';
import { LiveViewComponent } from './live/live-view/live-view.component';
import { RoundsComponent } from './common/rounds/rounds.component';
import { RoundNameDirective } from './common/round-name.directive';
import { RoundNamesDirective } from './common/round-names.directive';
import { SidebarComponent } from './booth/sidebar/sidebar.component';
import { GuessEditorComponent } from './booth/guess-editor/guess-editor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GuessSelectorComponent } from './booth/guess-selector/guess-selector.component';
import { MatchEditorComponent } from './booth/match-editor/match-editor.component';
import { ButtonGroupComponent } from './booth/button-group/button-group.component';
import { ButtonGroupItemDirective } from './booth/button-group/button-group-item.directive';
import { RoundNamesComponent } from './common/round-names/round-names.component';
import { OptionalScoreComponent } from './live/optional-score/optional-score.component';
import { LiveSlateComponent } from './live/live-slate/live-slate.component';
import { LiveScoreboardComponent } from './live/live-scoreboard/live-scoreboard.component';
import { LiveGuessesComponent } from './live/live-guesses/live-guesses.component';
import { GuessAnswersFormComponent } from './booth/guess-answers-form/guess-answers-form.component';
import {Match} from "./config/match";
import { InputModalComponent } from './common/input-modal/input-modal.component';
import { OptionalTeamEditorComponent } from './booth/optional-team-editor/optional-team-editor.component';
import { SocialInfoComponent } from './live/social-info/social-info.component';
import { ThemeSlideEditorComponent } from './booth/theme-slide-editor/theme-slide-editor.component';
import { ThemeSlideBackgroundDirective } from './common/theme-slide-background.directive';
import { LiveThemesComponent } from './live/live-themes/live-themes.component';
import { ThemeSlideTitleDirective } from './common/theme-slide-title.directive';
import { ThemeSlideSelectorComponent } from './booth/theme-slide-selector/theme-slide-selector.component';
import { FlybyComponent } from './common/flyby/flyby.component';
import { MatchRoundsEditorComponent } from './booth/match-rounds-editor/match-rounds-editor.component';
import { MatchTeamsEditorComponent } from './booth/match-teams-editor/match-teams-editor.component';
import { MatchProfileEditorComponent } from './booth/match-profile-editor/match-profile-editor.component';
import {NgOptimizedImage} from "@angular/common";
import { ColoredImageComponent } from './common/colored-image/colored-image.component';
import { MatchClockComponent } from './booth/match-clock/match-clock.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IconSelectorComponent } from './common/icon-selector/icon-selector.component';
import { DebugInfoComponent } from './common/debug-info/debug-info.component';

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
    LiveGuessesComponent,
    GuessAnswersFormComponent,
    InputModalComponent,
    OptionalTeamEditorComponent,
    SocialInfoComponent,
    ThemeSlideEditorComponent,
    ThemeSlideBackgroundDirective,
    LiveThemesComponent,
    ThemeSlideTitleDirective,
    ThemeSlideSelectorComponent,
    FlybyComponent,
    MatchRoundsEditorComponent,
    MatchTeamsEditorComponent,
    MatchProfileEditorComponent,
    ColoredImageComponent,
    MatchClockComponent,
    IconSelectorComponent,
    DebugInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    })
  ],
  providers: [Match.provider],
  bootstrap: [AppComponent]
})
export class AppModule { }
