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
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = routeParams.get("id");

    // Find the product that correspond with the id provided in route.
    this.dataService
      .getProject(idFromRoute)
      .pipe(first())
      .subscribe((x) => (this.project = x));
  }

  @Input() project: ProjectModel;
}
