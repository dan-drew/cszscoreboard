import {Profile} from "./profile";
import {EventEmitter} from "@angular/core";
import {BehaviorSubject, map, mapTo, zip} from "rxjs";

export class Rounds {
  static readonly default: string[] = [
    'Opening',
    'Choice',
    'Ref\'s Option',
    'Catch Up',
    'Half Time',
    'Head-to-Head',
    'Challenge',
    'Last Chance',
    'Finale'
  ]

  private _names: string[]
  readonly current = new BehaviorSubject<number>(0)
  readonly namesChange = new EventEmitter<void>()
  readonly currentName = this.current.pipe(
    map(value => {
      return this._names[value]
    })
  )

  constructor(profile: Profile) {
    this._names = Array.from(profile.rounds)
  }

  setCurrent(val: number) {
    this.current.next(val)
  }

  get names() {
    return this._names
  }

  set names(val) {
    this._names = val
    this.namesChange.emit()
  }

  get count() {
    return this.names.length
  }
}
