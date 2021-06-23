import { Component, Input, OnInit } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";
import { DataService } from "../shared/services/data.service";
import { MatDialog } from "@angular/material/dialog";
import { first } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styleUrls: ["./view-project.component.scss"],
})
export class ViewProjectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = routeParams.get("projectId");
    if (!idFromRoute) {
      this.notFound = true;
    } else {
      this.loadProject(idFromRoute);
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
          }
        },
        (error) => (this.notFound = true)
      );
  }

  notFound = false;
  project: ProjectModel;
}
