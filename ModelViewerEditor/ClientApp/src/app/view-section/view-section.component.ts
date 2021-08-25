import { Component, Inject, OnInit } from "@angular/core";
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
import { RenameSectionDialogComponent } from "../rename-section-dialog/rename-section-dialog.component";
import { ObjectModel } from "../shared/models/objectModel";

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
     @Inject("BASE_URL") private baseUrl: string
  ) {}

  projectId = "";
  sectionId = "";
  notFound = false;
  project: ProjectModel;
  section: SectionModel;
    pngs: string[];

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

            this.getPngs();

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

  private getPngs() {
    this.dataService.listPngs( this.project.id).subscribe(pngs => this.pngs = pngs);
  }

   pngExists(modelId: string): boolean {
    return this.pngs && this.pngs.indexOf(modelId) > -1;
  }

    pngSource(modelId: string): string {
    return `${this.baseUrl}models/${this.projectId}/${modelId}.png`;
  }

  on_SelectionChange($event: MatSelectionListChange) {
    console.log($event.options[0].value);
    let id = $event.options[0].value;
    this._router.navigate(["project", this.project.id, this.section.id, id]);
  }

  select(id: string) {
        this._router.navigate(["project", this.project.id, this.section.id, id]);

  }

  onNewModel_click() {
    const dialogRef = this.dialog.open(NewModelDialogComponent, {
      height: "400px",
      width: "600px",
      data: { projectId: this.project.id, section: this.section },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.loadProjectAndSection(
      //  this.projectId,
      //  this.sectionId
      //);
      this._router.navigate(["project", this.project.id, this.section.id, result.id]);
    });
  }

  onRenameSection_click() {
    const dialogRef = this.dialog.open(RenameSectionDialogComponent, {
      height: "400px",
      width: "600px",
      data: { project: this.project, section: this.section },
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
