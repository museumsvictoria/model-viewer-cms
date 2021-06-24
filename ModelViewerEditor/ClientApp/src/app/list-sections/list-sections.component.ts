import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectModel } from "../shared/models/projectModel";
import { MatSelectionListChange } from "@angular/material/list";
import { NewProjectDialogComponent } from "../new-project-dialog/new-project-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { NewSectionDialogComponent } from "../new-section-dialog/new-section-dialog.component";

@Component({
  selector: "app-list-sections",
  templateUrl: "./list-sections.component.html",
  styleUrls: ["./list-sections.component.scss"],
})
export class ListSectionsComponent implements OnInit {
  constructor(private _router: Router, private dialog: MatDialog) {}

  @Input() project: ProjectModel;

  ngOnInit(): void {}

  on_SelectionChange($event: MatSelectionListChange) {
    let id = $event.options[0].value;
    this._router.navigate(["project", this.project.id, id]);
  }

  onNewSection_click() {
    const dialogRef = this.dialog.open(NewSectionDialogComponent, {
      height: "400px",
      width: "600px",
      data: { project: this.project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //  this.dataService.getProjects().subscribe(x => this.projects = x);
    });
  }
}
