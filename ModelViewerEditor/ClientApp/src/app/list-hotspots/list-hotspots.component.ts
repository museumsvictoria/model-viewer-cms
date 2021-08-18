import { Component, Input, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ProjectModel } from "../shared/models/projectModel";
import { MatSelectionListChange } from "@angular/material/list";
import { NewModelDialogComponent } from "../new-model-dialog/new-model-dialog.component";
import { ObjectModel } from "../shared/models/objectModel";
import { HotspotModel } from "../shared/models/hotspotModel";
import { SectionModel } from "../shared/models/sectionModel";

@Component({
  selector: "app-list-hotspots",
  templateUrl: "./list-hotspots.component.html",
  styleUrls: ["./list-hotspots.component.scss"],
})
export class ListHotspotsComponent implements OnInit {
  constructor(private _router: Router, private dialog: MatDialog) { }

  @Input() model: ObjectModel;

  @Output() selectHotspot = new EventEmitter<HotspotModel>();

  ngOnInit(): void { }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectHotspot.emit(event.option.value);

  }
}
