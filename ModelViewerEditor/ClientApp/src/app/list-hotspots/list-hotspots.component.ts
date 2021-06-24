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
  constructor(private _router: Router, private dialog: MatDialog) {}

  @Input() model: ObjectModel;

  @Output() hotspotSelect = new EventEmitter<HotspotModel>();

  ngOnInit(): void {}

  on_SelectionChange($event: MatSelectionListChange) {
    let hotspot = $event.options[0].value;
    this.hotspotSelect.emit(hotspot);
  }
}
