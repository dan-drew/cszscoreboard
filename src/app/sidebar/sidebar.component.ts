import { Component } from '@angular/core';

type TabName = 'guesses' | 'settings'

interface TabDef {
  name: TabName
  icon?: string
  selectedIcon?: string
  image?: string
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
    { name: 'guesses', image: '/assets/guess.png', selectedIcon: 'question-circle-fill' }
  ]

  selectedTab?: TabName = 'settings'  // Open to settings by default

  openLive() {
    window.open('/live', 'cszScoreboardLive', 'popup')
  }
}
