import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { DataService } from "../shared/services/data.service";
import { first } from "rxjs/operators";
import { ProjectModel } from "../shared/models/projectModel";
import { SectionModel } from "../shared/models/sectionModel";

import { MatDialog } from "@angular/material/dialog";
import {ConfirmDialogService} from "../shared/services/confirm-dialog.service";

@Component({
  selector: "app-view-section",
  templateUrl: "./view-section.component.html",
  styleUrls: ["./view-section.component.scss"],
})
export class ViewSectionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private dataService: DataService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  projectId = "";
  sectionId = "";
  notFound = false;
  project: ProjectModel;
  section: SectionModel;

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.projectId = routeParams.get("projectId");
    this.sectionId = routeParams.get("sectionId");
    if (!this.projectId) {
      this.notFound = true;
    } else {
      this.loadProjectAndSection(
        this.projectId,
        this.sectionId
      );
    }
  }

  private loadProjectAndSection(projId: string, sectId: string) {
    this.dataService
      .getProject(projId)
      .pipe(first())
      .subscribe(
        (project) => {
          if (project) {
            this.project = project;
            this.section = project.sections.find((x) => x.id == sectId);
          }
          if (!this.project || !this.section) {
            this.notFound = true;
          }
        },
        (error) => (this.notFound = true)
      );
  }



  onModelAdded() {
    this.loadProjectAndSection(
      this.projectId,
      this.sectionId
    );
  }

  onDeleteClick() {
    this.confirmDialogService.confirmDialog(
      "Delete Section",
      "This is irreversible! Are you sure?",
      (result) => {
        if (!result) {
          return;
        }
        this.dataService.deleteSection(this.projectId, this.sectionId)
          .subscribe( () => {
              this._router.navigate(['project', this.projectId]);
            },
            (err) => {
              this.confirmDialogService.showHttpError(err)
            }
          );
      }
    );
  }


}
