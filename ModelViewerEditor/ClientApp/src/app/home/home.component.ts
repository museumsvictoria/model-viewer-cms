import { Component } from "@angular/core";
import { DataService } from "../shared/services/data.service";
import { ProjectModel } from "../shared/models/projectModel";
import {MatDialog} from "@angular/material/dialog";
import {NewProjectDialogComponent} from "../new-project-dialog/new-project-dialog.component";
import {first} from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(private dataService: DataService,private dialog: MatDialog) {
    this.dataService.getProjects().pipe(first()).subscribe(x => this.projects = x);
  }

  projects: ProjectModel[];

  selectedProject: ProjectModel;

  onNewProject_click() {
    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
    //  this.dataService.getProjects().subscribe(x => this.projects = x);
    })



  }


}
