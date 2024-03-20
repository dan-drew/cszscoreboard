import {Injectable} from "@angular/core";

const BUILD_TIME = "2024-03-19T21:27:46-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
