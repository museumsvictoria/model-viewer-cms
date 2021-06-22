import { Component } from "@angular/core";
import { DataService } from "../shared/services/data.service";
import { ProjectModel } from "../shared/models/projectModel";
import {MatDialog} from "@angular/material/dialog";
import {NewProjectDialogComponent} from "../new-project-dialog/new-project-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(private dataService: DataService,private dialog: MatDialog) {
    this.projects = dataService.getProjects();
  }

  projects: ProjectModel[];

  selectedProject: ProjectModel;

  addingProject = false;

  onNewProject_click() {
    this.addingProject = true;

    const dialogRef = this.dialog.open(NewProjectDialogComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.projects = this.dataService.getProjects();
    })



  }

  onProjectCreation(newProject: ProjectModel) {
    this.addingProject = false;
    this.projects.push(newProject);
  }

  onProjectCreationCancel() {
    this.addingProject = false;
  }
}
