import { Component, Input, OnInit } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";
import { DataService } from "../shared/services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmDialogService } from "../shared/services/confirm-dialog.service";

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
    private _snackBar: MatSnackBar
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
          } else {
            this.project = project;
            console.log(this.project);
          }
        },
        (error) => {
          this.notFound = true;
        }
      );
  }

  notFound = false;
  project: ProjectModel;

  onSectionAdded() {
    console.log("onSectionAdded");
    this.loadProject(this.idFromRoute);
  }

  onDeleteClick() {
    this.confirmDialogService.confirmDialog(
      "Delete Project",
      "This is irreversible! Are you sure?",
      (result) => {
        if (!result) {
          return;
        }
        this.dataService.deleteProject(this.project.id)
          .subscribe( () => {
            this._router.navigate([""]);
          },
          (err) => {
            this.confirmDialogService.showHttpError(err)
          }
        );
      }
    );
  }
}
