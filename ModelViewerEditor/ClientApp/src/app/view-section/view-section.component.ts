import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../shared/services/data.service";
import { first } from "rxjs/operators";
import { ProjectModel } from "../shared/models/projectModel";
import { SectionModel } from "../shared/models/sectionModel";

@Component({
  selector: "app-view-section",
  templateUrl: "./view-section.component.html",
  styleUrls: ["./view-section.component.scss"],
})
export class ViewSectionComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const projectIdFromRoute = routeParams.get("projectId");
    const sectionIdFromRoute = routeParams.get("sectionId");
    if (!projectIdFromRoute) {
      this.notFound = true;
    } else {
      this.loadProjectAndSection(projectIdFromRoute, sectionIdFromRoute);
    }
  }

  private loadProjectAndSection(projectId: string, sectionId: string) {
    this.dataService
      .getProject(projectId)
      .pipe(first())
      .subscribe(
        (project) => {
          if (project) {
            this.project = project;
            this.section = project.sections.find((x) => x.id == sectionId);
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
}
