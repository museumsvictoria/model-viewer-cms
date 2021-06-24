import { Component, Inject, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Observable, of, throwError } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DataService } from "../shared/services/data.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {ProjectModel, SectionModel} from "../shared/models/projectModel";

@Component({
  selector: "app-new-model-dialog",
  templateUrl: "./new-model-dialog.component.html",
  styleUrls: ["./new-model-dialog.component.scss"],
})
export class NewModelDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { section: SectionModel },
    private dataService: DataService,
    private dialogRef: MatDialogRef<NewModelDialogComponent>
  ) {}

  modelName = new FormControl("", {
    validators: [Validators.required],
    asyncValidators: [this.validateNameViaServer.bind(this)],
  });

  ngOnInit(): void {}
  onSubmit_click() {
    this.dataService
      .addModel(this.data.section, this.modelName.value)
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

  validateNameViaServer(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    var r = this.data.section.objects.some(
      (x) => x.name.trim().toLowerCase() == ctrl.value.trim().toLowerCase()
    );
    return of(r ? { nameExists: true } : null);
  }
}
