import {Injectable} from "@angular/core";

const BUILD_TIME = "2023-11-26T10:59:01-08:00"

@Injectable({providedIn: "root"})
export class BuildInfo {
  readonly buildTime = Date.parse(BUILD_TIME)
}
