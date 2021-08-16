import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import {HotspotModel} from "../shared/models/hotspotModel";

@Component({
  selector: "app-hotspot-form",
  templateUrl: "./hotspot-form.component.html",
  styleUrls: ["./hotspot-form.component.scss"],
})
export class HotspotFormComponent implements OnInit {
  // io
  @Input() set hotspot(hs: HotspotModel){
    this.text = hs.text;
    this.position = hs.dataPosition;
    this.normal = hs.dataNormal;
  }


  @Output() editing = new EventEmitter<boolean>();
  @Output() updated = new EventEmitter<string>();
  @Output() deleting = new EventEmitter();
  @Output() moving = new EventEmitter<boolean>();
  // public properties
  inEditMode: boolean;
  inMovingMode: boolean;
  text: string;
  position: string;
  normal: string;

  // form controls
  editHotspotText = new FormControl("", {});

  // private fields

  // lifecycle

  constructor() {}

  ngOnInit(): void {}

  // public methods

  onEdit() {
    this.editHotspotText.setValue(this.text);
    this.inEditMode = true;
    this.editing.emit(true);
  }

  onDelete() {
    this.deleting.emit();
  }

  onMove() {
    this.inMovingMode = true;
    this.moving.emit(true);
  }

  onCancel() {
    this.inMovingMode = false;
    this.inEditMode = false;
    this.editing.emit(false);
    this.moving.emit(false);
  }

  onSave() {
    this.text = this.editHotspotText.value;
    this.updated.emit(this.text);
    this.inEditMode = false;
    this.editing.emit(false);
  }

  moveComplete(){
    this.inMovingMode = false;
    this.moving.emit(false);
  }

  // private methods
}
