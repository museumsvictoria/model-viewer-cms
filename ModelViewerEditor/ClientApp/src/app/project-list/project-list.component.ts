import { Component, Input, OnInit } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";
import { MatSelectionListChange } from "@angular/material/list";
import { Router } from "@angular/router";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  constructor(private _router: Router) {}

  @Input() projects: ProjectModel[];

  ngOnInit(): void {}

  on_SelectionChange($event: MatSelectionListChange) {
    let id = $event.options[0].value;
    this._router.navigate(["project", id]);
  }
}
