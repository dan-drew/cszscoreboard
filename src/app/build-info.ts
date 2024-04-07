import {Injectable} from "@angular/core";

const BUILD_TIME = "2024-04-14T13:11:44-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
