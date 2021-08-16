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
import { SectionModel } from "../shared/models/sectionModel";

@Component({
  templateUrl: "./rename-section-dialog.component.html",
  styleUrls: ["./rename-section-dialog.component.scss"],
})
export class RenameSectionDialogComponent implements OnInit {
  sectionName = new FormControl("", {
    validators: [Validators.required],
    asyncValidators: [this.validateName.bind(this)],
  });


  project: ProjectModel;
  section: SectionModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { project: ProjectModel, section: SectionModel },
    private dataService: DataService,
    private dialogRef: MatDialogRef<RenameSectionDialogComponent>
  ) { }

  ngOnInit(): void {
    this.project = this.data.project;
    this.section = this.data.section;
    this.sectionName.setValue(this.section.name);
  }


  onSubmit_click() {
    this.dataService.renameSection(this.project.id, this.section.id, this.sectionName.value).subscribe(
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

    if (ctrl.value === this.section.name)
      return of(null);

    const r = this.data.project.sections && this.data.project.sections.some(x => x.name && x.name.trim().toLowerCase() == ctrl.value.trim().toLowerCase());
    return of(r ? { nameExists: true } : null);

  }

 
}
