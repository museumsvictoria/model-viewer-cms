import { Component, Input, OnInit } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";
import { MatSelectionListChange } from "@angular/material/list";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-projects",
  templateUrl: "./list-projects.component.html",
  styleUrls: ["./list-projects.component.scss"],
})
export class ListProjectsComponent implements OnInit {
  constructor(private _router: Router) {}

  @Input() projects: ProjectModel[];

  ngOnInit(): void {}

  on_SelectionChange($event: MatSelectionListChange) {
    let id = $event.options[0].value;
    this._router.navigate(["project", id]);
  }
}
