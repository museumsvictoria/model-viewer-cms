import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../shared/services/data.service";
import { first } from "rxjs/operators";
import { ProjectModel } from "../shared/models/projectModel";
import { ObjectModel } from "../shared/models/objectModel";
import { HotspotModel } from "../shared/models/hotspotModel";
import { SectionModel } from "../shared/models/sectionModel";
import { ConfirmDialogService } from "../shared/services/confirm-dialog.service";

@Component({
  selector: "app-view-model",
  templateUrl: "./view-model.component.html",
  styleUrls: ["./view-model.component.scss"],
})
export class ViewModelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private dataService: DataService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const projectId = routeParams.get("projectId");
    const sectionId = routeParams.get("sectionId");
    const modelId = routeParams.get("modelId");
    if (!projectId) {
      this.notFound = true;
    } else {
      this.loadProjectAndSection(projectId, sectionId, modelId);
    }
  }

  private loadProjectAndSection(
    projectId: string,
    sectionId: string,
    modelId: string
  ) {
    this.dataService
      .getProject(projectId)
      .pipe(first())
      .subscribe(
        (project) => {
          if (project) {
            this.project = project;
            this.section = project.sections.find((x) => x.id == sectionId);
            this.model = this.section.models.find((x) => x.id == modelId);
          }
          if (!this.project || !this.section) {
            this.notFound = true;
          }
        },
        (error) => (this.notFound = true)
      );
  }

  notFound = false;
  project: ProjectModel;
  section: SectionModel;
  model: ObjectModel;

  onHotspotSelect(hotspot: HotspotModel) {
    console.log(hotspot);
  }

  onDeleteClick() {
    this.confirmDialogService.confirmDialog(
      "Delete Section",
      "This is irreversible! Are you sure?",
      (result) => {
        if (!result) {
          return;
        }
        this.dataService
          .deleteModel(this.project.id, this.section.id, this.model.id)
          .subscribe(
            () => {
              this._router.navigate([
                "project",
                this.project.id,
                this.section.id,
              ]);
            },
            (err) => {
              this.confirmDialogService.showHttpError(err);
            }
          );
      }
    );
  }
}
