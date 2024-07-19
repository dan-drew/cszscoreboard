import {Injectable} from "@angular/core";

const BUILD_TIME = "2024-07-19T10:06:40-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
