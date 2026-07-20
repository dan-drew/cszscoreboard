import {Injectable} from "@angular/core";

const BUILD_TIME = "2026-07-19T21:46:51-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
