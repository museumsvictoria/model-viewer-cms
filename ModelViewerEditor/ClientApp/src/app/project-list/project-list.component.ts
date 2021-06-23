import { Component, Input, OnInit } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  constructor() {}

  @Input() projects: ProjectModel[];

  ngOnInit(): void {}
}
