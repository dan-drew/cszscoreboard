import { Component } from '@angular/core';
import {Match} from "../../config/match";

type TabName = 'guesses' | 'settings'

interface TabDefParam {
    tab?: TabName
    name?: string
    icon?: string
    selectedIcon?: string
    image?: string
    classes?: string[]
    action?: () => void
}

class TabDef {
  readonly tab?: TabName
  readonly name?: string
  readonly icon?: string
  readonly selectedIcon?: string
  readonly image?: string
  readonly classes: string[]
  readonly action?: () => void

  constructor({tab, name, icon, selectedIcon, classes}: Required<Pick<TabDefParam, 'tab' | 'icon'>> & Pick<TabDefParam, 'name' | 'selectedIcon' | 'classes'>)
  constructor({tab, name, image}: Required<Pick<TabDefParam, 'tab' | 'image'>> & Pick<TabDefParam, 'name'>)
  constructor({name, icon, selectedIcon, action, classes}: Required<Pick<TabDefParam, 'name' | 'icon' | 'action'>> & Pick<TabDefParam, 'selectedIcon' | 'classes'>)
  constructor({name, image, action}: Required<Pick<TabDefParam, 'name' | 'image' | 'action'>>)
  constructor({tab, name, icon, selectedIcon, image, action, classes}: TabDefParam) {
    this.tab = tab
    this.name = name || tab
    this.icon = icon
    this.selectedIcon = selectedIcon || icon
    this.image = image
    this.action = action
    this.classes = (classes || []).concat('tab')
  }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    class: 'position-relative h-100'
  }
})
export class SidebarComponent {
  readonly helpLink = 'https://docs.google.com/document/d/13iQDgkSyzAIu081jAqJ1sTHh7XaiV4Ny3FXpckTTWuo/edit?usp=sharing'

  readonly tabs: TabDef[] = [
    new TabDef({ name: 'Open Live View', icon: 'pip', action: () => this.openLive(), classes: ['green'] }),
    new TabDef({ tab: 'settings', icon: 'gear', selectedIcon: 'gear-fill' }),
    new TabDef({ tab: 'guesses', image: '/assets/guess.png' }),
    new TabDef({ name: 'Optional Team', image: '/assets/postit.png', action: () => this.optionalTeam() }),
    new TabDef({ name: 'Help', icon: 'info-circle-fill', action: () => this.help() })
  ]

  selectedTab?: TabName = 'settings'  // Open to settings by default

  constructor(
    readonly match: Match
  ) {
  }

  tabClicked(tab: TabDef) {
    if (tab.action) {
      tab.action()
    } else {
      this.selectedTab = tab.tab
    }
  }

  tabIcon(tab: TabDef) {
    const icon = this.selectedTab === tab.name ? tab.selectedIcon : tab.icon
    return `bi-${icon}`
  }

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup')
  }

  optionalTeam() {
    if (this.match.teams.optionalEnabled) {
      this.match.teams.optionalEnabled = false
    } else {
      const teamName = prompt('Enter a name for the team', this.match.teams.optional.name)

      if (teamName) {
        this.match.teams.optional.name = teamName
        this.match.teams.optionalEnabled = true
      }
    }
  }

  help() {
    window.open(this.helpLink)
  }
}
