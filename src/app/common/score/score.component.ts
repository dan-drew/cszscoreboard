import {Component, HostBinding, Input} from '@angular/core';
import {Match} from "../../config/match";
import {Team} from "../../config/team";
import {InputService} from "../input.service";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  providers: [
    { provide: TitleCasePipe, useClass: TitleCasePipe }
  ]
})
export class ScoreComponent {
  @Input() editable: boolean = false

  constructor(
    public readonly match: Match,
    private readonly inputService: InputService,
    private readonly titleCase: TitleCasePipe
  ) {
  }

  editScore(team: Team) {
    const teamName = this.titleCase.transform(team.type)

    this.inputService.show({
      title: `${teamName} Team Score`,
      prompt: `Please enter the <b>${teamName}</b> score:`,
      initial: team.score.toFixed(0),
      callback: (text) => {
        const newScore = Number(text)
        if (!Number.isNaN(newScore)) team.score = newScore
      }
    })
  }

  @HostBinding('class.editable')
  get editableClass() {
    return this.editable
  }

  @HostBinding('class.optional')
  get optionalClass() {
    return this.match.teams.optionalEnabled
  }
}
