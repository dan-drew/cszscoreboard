import {Injectable} from "@angular/core";

const BUILD_TIME = "2024-03-03T13:18:48-08:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
