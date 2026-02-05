import {Injectable} from "@angular/core";

const BUILD_TIME = "2026-03-12T11:09:50-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
