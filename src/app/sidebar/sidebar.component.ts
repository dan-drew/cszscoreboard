import { Component } from '@angular/core';

type TabName = 'guesses' | 'settings'

interface TabDef {
  name: TabName
  icon: string
  selectedIcon: string
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
  readonly tabs: TabDef[] = [
    { name: 'settings', icon: 'gear', selectedIcon: 'gear-fill' },
    { name: 'guesses', icon: 'question-circle', selectedIcon: 'question-circle-fill' }
  ]

  selectedTab?: TabName

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup')
  }
}
