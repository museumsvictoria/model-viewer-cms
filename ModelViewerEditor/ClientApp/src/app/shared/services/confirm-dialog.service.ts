import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from "../confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmDialogService {
  constructor(private _dialog: MatDialog, private _snackBar: MatSnackBar) {}

  confirmDialog(
    title: string,
    message: string,
    complete?: (boolean) => void
  ): void {
    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(complete);
  }

  showMessage(message: string) {
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: "top",
    });
  }

  showHttpError(err: any) {
    let message = "";
    if (err.hasOwnProperty("error")) {
      if (err.error.hasOwnProperty("title")) {
        message = err.error.title;
      } else {
        message = err.error;
      }
    } else {
      message = err;
    }
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: "top",
    });
  }
}
