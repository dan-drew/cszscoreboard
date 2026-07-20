import {Injectable} from "@angular/core";

const BUILD_TIME = "2026-07-19T22:54:26-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
