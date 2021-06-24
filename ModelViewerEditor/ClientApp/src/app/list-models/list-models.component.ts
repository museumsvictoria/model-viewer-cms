import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ProjectModel, SectionModel } from "../shared/models/projectModel";
import { MatSelectionListChange } from "@angular/material/list";
import { NewSectionDialogComponent } from "../new-section-dialog/new-section-dialog.component";
import { NewModelDialogComponent } from "../new-model-dialog/new-model-dialog.component";

@Component({
  selector: "app-list-models",
  templateUrl: "./list-models.component.html",
  styleUrls: ["./list-models.component.scss"],
})
export class ListModelsComponent implements OnInit {
  constructor(private _router: Router, private dialog: MatDialog) {}

  @Input() project: ProjectModel;

  @Input() section: SectionModel;

  ngOnInit(): void {}

  on_SelectionChange($event: MatSelectionListChange) {
    console.log($event.options[0].value);
    let id = $event.options[0].value;
    this._router.navigate(["project", this.project.id, this.section.id, id]);
  }

  onNewModel_click() {
    const dialogRef = this.dialog.open(NewModelDialogComponent, {
      height: "400px",
      width: "600px",
      data: { section: this.section },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //  this.dataService.getProjects().subscribe(x => this.projects = x);
    });
  }
}
