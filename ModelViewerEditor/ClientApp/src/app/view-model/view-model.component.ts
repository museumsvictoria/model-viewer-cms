import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../shared/services/data.service";
import { first } from "rxjs/operators";
import { ProjectModel } from "../shared/models/projectModel";
import { ObjectModel } from "../shared/models/objectModel";
import { HotspotModel } from "../shared/models/hotspotModel";
import { SectionModel } from "../shared/models/sectionModel";

@Component({
  selector: "app-view-model",
  templateUrl: "./view-model.component.html",
  styleUrls: ["./view-model.component.scss"],
})
export class ViewModelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const projectIdFromRoute = routeParams.get("projectId");
    const sectionIdFromRoute = routeParams.get("sectionId");
    const modelIdFromRoute = routeParams.get("modelId");
    if (!projectIdFromRoute) {
      this.notFound = true;
    } else {
      this.loadProjectAndSection(
        projectIdFromRoute,
        sectionIdFromRoute,
        modelIdFromRoute
      );
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
}
