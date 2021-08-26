import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-json-dialog',
  templateUrl: './view-json-dialog.component.html',
  styleUrls: ['./view-json-dialog.component.scss']
})
export class ViewJsonDialogComponent implements OnInit {

  json: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: string,
  ) {
    this.json = data;
  }

  ngOnInit(): void {

  }

  

}
