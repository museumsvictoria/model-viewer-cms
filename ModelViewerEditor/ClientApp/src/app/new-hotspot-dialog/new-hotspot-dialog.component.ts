import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-new-hotspot-dialog",
  templateUrl: "./new-hotspot-dialog.component.html",
  styleUrls: ["./new-hotspot-dialog.component.scss"],
})
export class NewHotspotDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<NewHotspotDialogComponent>) {}

  text = new FormControl("", {
    validators: [Validators.required],
  });

  onSubmit_click() {
    this.dialogRef.close(this.text.value);
  }

  ngOnInit(): void {}
}
