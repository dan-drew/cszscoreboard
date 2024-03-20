import { Component } from '@angular/core';
import {Match} from "../../config/match";
import {Profile} from "../../config/profile";

@Component({
  selector: 'app-profile-picker',
  templateUrl: './profile-picker.component.html',
  styleUrls: ['./profile-picker.component.scss'],
  host: {
    class: 'fullscreen bg-black bg-opacity-75'
  }
})
export class ProfilePickerComponent {
  constructor(
    protected readonly match: Match
  ) {
  }

  setProfile(profile: Profile) {
    this.match.setProfile(profile)
    this.match.profileSelected = true
  }
}
