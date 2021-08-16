import { Component, Inject, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import {Observable, of, throwError} from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DataService } from "../shared/services/data.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ProjectModel } from "../shared/models/projectModel";

@Component({
  selector: "app-new-section-dialog",
  templateUrl: "./new-section-dialog.component.html",
  styleUrls: ["./new-section-dialog.component.scss"],
})
export class NewSectionDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { project: ProjectModel },
    private dataService: DataService,
    private dialogRef: MatDialogRef<NewSectionDialogComponent>
  ) {}

  sectionName = new FormControl("", {
    validators: [Validators.required],
    asyncValidators: [this.validateName.bind(this)],
  });

  ngOnInit(): void {}
  onSubmit_click() {
    this.dataService
      .addSection(this.data.project.id, this.sectionName.value)
      .subscribe(
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
    const r = this.data.project.sections && this.data.project.sections.some(x => x.name && x.name.trim().toLowerCase() == ctrl.value.trim().toLowerCase());
    return of(r ? { nameExists: true } : null);

  }
}
