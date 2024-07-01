import {Injectable} from "@angular/core";

const BUILD_TIME = "2024-07-02T09:39:35-07:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
