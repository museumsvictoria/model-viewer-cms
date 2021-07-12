import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  HostBinding,
  OnInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { OverlayContainer } from "@angular/cdk/overlay";
import { FormControl } from "@angular/forms";
import { AppHeadingService } from "./shared/services/app-heading.service";
import { BreadcrumbModel } from "./shared/models/breadcrumbModel";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterContentInit {
  title = "app";

  @HostBinding("class") className = "";

  toggleControl = new FormControl(false);
  breadcrumbs: BreadcrumbModel[];

  constructor(
    private appHeadingService: AppHeadingService,
    private overlay: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.appHeadingService.breadcrumbs.subscribe(
      (breadcrumbs) => (this.breadcrumbs = breadcrumbs)
    );

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = "dark-theme";
      this.className = darkMode ? darkClassName : "";
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  ngAfterContentChecked(): void {}

  ngAfterContentInit(): void {}
}
