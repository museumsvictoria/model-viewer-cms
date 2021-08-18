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
import { Observable, of, pipe } from "rxjs";
import { ObjectModel } from "../shared/models/objectModel";
import { SectionModel } from "../shared/models/sectionModel";

@Component({
  templateUrl: "./rename-model-dialog.component.html",
  styleUrls: ["./rename-model-dialog.component.scss"],
})
export class RenameModelDialogComponent implements OnInit {
  modelName = new FormControl("", {
    validators: [Validators.required],
    asyncValidators: [this.validateName.bind(this)],
  });


  project: ProjectModel;
  section: SectionModel;
  model: ObjectModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { project: ProjectModel, section: SectionModel, model: ObjectModel },
    private dataService: DataService,
    private dialogRef: MatDialogRef<RenameModelDialogComponent>
  ) { }

  ngOnInit(): void {
    this.project = this.data.project;
    this.section = this.data.section;
    this.model = this.data.model;
    this.modelName.setValue(this.model.name);
  }


  onSubmit_click() {
    this.dataService.renameModel(this.project.id, this.section.id, this.model.id, this.modelName.value).subscribe(
      () => {
        this.dialogRef.close();
      },
      (err) => console.log(err)
    );
  }

  onCancel_click() {
    this.dialogRef.close();
  }

  validateName(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    if (ctrl.value === this.model.name)
      return of(null);

    const r = this.section.models && this.section.models.some(x => x.name && x.name.trim().toLowerCase() == ctrl.value.trim().toLowerCase());
    return of(r ? { nameExists: true } : null);

  }

 
}
