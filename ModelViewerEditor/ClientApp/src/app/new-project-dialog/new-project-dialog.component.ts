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
import { Observable, pipe } from "rxjs";

@Component({
  templateUrl: "./new-project-dialog.component.html",
  styleUrls: ["./new-project-dialog.component.scss"],
})
export class NewProjectDialogComponent implements OnInit {
  projectName = new FormControl("", {
    validators: [Validators.required],
    asyncValidators: [this.validateNameViaServer.bind(this)],
  });

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<NewProjectDialogComponent>
  ) {}

  ngOnInit(): void {}

  onSubmit_click() {
    this.dataService.addProject(this.projectName.value).subscribe(
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
    return this.dataService
      .projectExists(ctrl.value)
      .pipe(map((x) => (x ? { nameExists: true } : null)));
  }
}
