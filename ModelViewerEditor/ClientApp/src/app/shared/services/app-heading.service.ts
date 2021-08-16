import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {BreadcrumbModel} from "../models/breadcrumbModel";

@Injectable({
  providedIn: "root",
})
export class AppHeadingService {
  constructor() {}

  breadcrumbs = new BehaviorSubject<BreadcrumbModel[]>([]);

  setBreadcrumbs(values: BreadcrumbModel[]) {
    this.breadcrumbs.next(values);
  }
}
