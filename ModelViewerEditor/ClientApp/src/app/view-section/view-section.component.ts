import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import { DataService } from "../shared/services/data.service";
import { first } from "rxjs/operators";
import { ProjectModel } from "../shared/models/projectModel";
import { SectionModel } from "../shared/models/sectionModel";

import { MatDialog } from "@angular/material/dialog";
import {ConfirmDialogService} from "../shared/services/confirm-dialog.service";
import {MatSelectionListChange} from "@angular/material/list";
import {NewModelDialogComponent} from "../new-model-dialog/new-model-dialog.component";
import {AppHeadingService} from "../shared/services/app-heading.service";

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
    private confirmDialogService: ConfirmDialogService,
    private dialog: MatDialog,
    private appHeadingService: AppHeadingService,
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
          else{
            this.appHeadingService.setBreadcrumbs([
              { routerLink: ["/"], text: "Projects" },
              { routerLink: ['/', 'project', project.id], text: project.name },
              { routerLink: [], text: this.section.name },
            ]);
          }
        },
        (error) => (this.notFound = true)
      );
  }

  on_SelectionChange($event: MatSelectionListChange) {
    console.log($event.options[0].value);
    let id = $event.options[0].value;
    this._router.navigate(["project", this.project.id, this.section.id, id]);
  }

  onNewModel_click() {
    const dialogRef = this.dialog.open(NewModelDialogComponent, {
      height: "400px",
      width: "600px",
      data: { projectId: this.project.id, section: this.section },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProjectAndSection(
        this.projectId,
        this.sectionId
      );
    });
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
