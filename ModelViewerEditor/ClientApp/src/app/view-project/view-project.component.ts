import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";
import { DataService } from "../shared/services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmDialogService } from "../shared/services/confirm-dialog.service";
import { AppHeadingService } from "../shared/services/app-heading.service";
import { MatSelectionListChange } from "@angular/material/list";
import { NewSectionDialogComponent } from "../new-section-dialog/new-section-dialog.component";
import { RenameProjectDialogComponent } from "../rename-project-dialog/rename-project-dialog.component";

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styleUrls: ["./view-project.component.scss"],
})
export class ViewProjectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private dataService: DataService,
    private confirmDialogService: ConfirmDialogService,
    private appHeadingService: AppHeadingService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  idFromRoute = "";

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.idFromRoute = routeParams.get("projectId");
    if (!this.idFromRoute) {
      this.notFound = true;
    } else {
      this.loadProject(this.idFromRoute);
    }
  }

  private loadProject(idFromRoute: string) {
    this.dataService
      .getProject(idFromRoute)
      .pipe(first())
      .subscribe(
        (project) => {
          if (!project) {
            this.notFound = true;
            this.appHeadingService.setBreadcrumbs([
              { routerLink: ["/"], text: "Projects" },
            ]);
          } else {
            this.project = project;
            this.appHeadingService.setBreadcrumbs([
              { routerLink: ["/"], text: "Projects" },
              { routerLink: [], text: project.name },
            ]);
          }
        },
        (error) => {
          this.notFound = true;
        }
      );
  }

  notFound = false;
  project: ProjectModel;

  // @Output() sectionAdded = new EventEmitter<any>();

  on_SelectionChange($event: MatSelectionListChange) {
    let id = $event.options[0].value;
    this._router.navigate(["project", this.project.id, id]);
  }

  onNewSection_click() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent, {
      height: "400px",
      width: "600px",
      data: { project: this.project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProject(this.idFromRoute);
    });
  }

   onRenameProject_click() {
    const dialogRef = this.dialog.open(RenameProjectDialogComponent, {
      height: "400px",
      width: "600px",
      data: { project: this.project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProject(this.idFromRoute);
    });
  }

  onDeleteClick() {
    this.confirmDialogService.confirmDialog(
      "Delete Project",
      "This is irreversible! Are you sure?",
      (result) => {
        if (!result) {
          return;
        }
        this.dataService.deleteProject(this.project.id).subscribe(
          () => {
            this._router.navigate([""]);
          },
          (err) => {
            this.confirmDialogService.showHttpError(err);
          }
        );
      }
    );
  }
}
