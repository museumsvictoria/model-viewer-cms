import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
} from "@angular/core";
import { DataService } from "../shared/services/data.service";
import { ProjectModel } from "../shared/models/projectModel";
import { MatDialog } from "@angular/material/dialog";
import { NewProjectDialogComponent } from "../new-project-dialog/new-project-dialog.component";
import { first } from "rxjs/operators";
import { AppHeadingService } from "../shared/services/app-heading.service";
import { MatSelectionListChange } from "@angular/material/list";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private _router: Router,
    private appHeadingService: AppHeadingService,
    private dialog: MatDialog
  ) {}

  projects: ProjectModel[];

  ngOnInit() {
    setTimeout(
      () =>
        this.appHeadingService.setBreadcrumbs([
          { routerLink: [], text: "Projects" },
        ]),
      0
    );

    this.dataService
      .getProjects()
      .pipe(first())
      .subscribe((x) => (this.projects = x));
  }
  on_SelectionChange($event: MatSelectionListChange) {
    let id = $event.options[0].value;
    this._router.navigate(["project", id]);
  }
  onNewProject_click() {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      height: "400px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dataService.getProjects().subscribe((x) => (this.projects = x));
    });
  }

  ngAfterViewInit(): void {}

  ngAfterContentChecked(): void {}
}
