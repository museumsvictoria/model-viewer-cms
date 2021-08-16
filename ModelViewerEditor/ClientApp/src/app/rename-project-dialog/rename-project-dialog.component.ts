import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { ProjectModel } from "../shared/models/projectModel";
import { DataService } from "../shared/services/data.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { debounceTime, first, map } from "rxjs/operators";
import { Observable, of, pipe } from "rxjs";

@Component({
  templateUrl: "./rename-project-dialog.component.html",
  styleUrls: ["./rename-project-dialog.component.scss"],
})
export class RenameProjectDialogComponent implements OnInit {
  projectName = new FormControl("", {
    validators: [Validators.required],
    asyncValidators: [this.validateNameViaServer.bind(this)],
  });


  project: ProjectModel;

  constructor(
     @Inject(MAT_DIALOG_DATA) private data: { project: ProjectModel },
    private dataService: DataService,
    private dialogRef: MatDialogRef<RenameProjectDialogComponent>
  ) { }

  ngOnInit(): void {
    this.project = this.data.project;
    this.projectName.setValue(this.project.name);
  }


  onSubmit_click() {
    this.dataService.renameProject(this.project.id, this.projectName.value).subscribe(
      () => {
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );
  }

  onCancel_click() {
    this.dialogRef.close();
  }

  validateNameViaServer(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    if(ctrl.value === this.project.name)
      return of(null);

    return this.dataService
      .projectExists(ctrl.value)
      .pipe(map((x) => (x ? { nameExists: true } : null)));
  }
}
