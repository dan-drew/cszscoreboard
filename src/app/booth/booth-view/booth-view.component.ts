import { Component, OnInit, inject } from '@angular/core';
import {Match, MatchView} from "../../config/match";
import {GuessingService} from "../../common/guessing.service";
import {Title} from "@angular/platform-browser";
import {HeartbeatService} from "../../common/heartbeat.service";
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { ButtonGroupItemDirective } from '../button-group/button-group-item.directive';
import { MatchClockComponent } from '../match-clock/match-clock.component';
import { ScoreComponent } from '../../common/score/score.component';
import { ThemeSlideSelectorComponent } from '../theme-slide-selector/theme-slide-selector.component';
import { GuessSelectorComponent } from '../guess-selector/guess-selector.component';
import { RoundsComponent } from '../../common/rounds/rounds.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfilePickerComponent } from '../profile-picker/profile-picker.component';
import { ScoreboardPreviewService } from '../scoreboard-preview.service';

@Component({
    selector: 'app-booth-view',
    templateUrl: './booth-view.component.html',
    styleUrls: ['./booth-view.component.scss'],
    host: {
        class: 'position-fixed top-0 bottom-0 start-0 end-0 overflow-hidden d-flex-row'
    },
    imports: [ButtonGroupComponent, ButtonGroupItemDirective, MatchClockComponent, ScoreComponent, ThemeSlideSelectorComponent, GuessSelectorComponent, RoundsComponent, SidebarComponent, ProfilePickerComponent]
})
export class BoothViewComponent implements OnInit {
  readonly match = inject(Match);
  private readonly guessing = inject(GuessingService);
  private readonly title = inject(Title);
  private readonly heartbeat = inject(HeartbeatService);
  private readonly scoreboardPreview = inject(ScoreboardPreviewService);


  ngOnInit() {
    this.title.setTitle('Booth - ComedySports Scoreboard')
    this.heartbeat.start()
  }

  viewAvailable(view: MatchView) {
    switch (view) {
      case 'guesses': return this.guessing.enabled
      case 'themes': return this.match.themeSlides.enabled
    }
    return true
  }

  get scoreboardPreviewUrl(): string {
    return this.scoreboardPreview.previewUrl(this.match);
  }
}
