import {Injectable} from "@angular/core";

const BUILD_TIME = "2023-12-13T15:56:32-08:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
