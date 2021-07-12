import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-hotspot-form",
  templateUrl: "./hotspot-form.component.html",
  styleUrls: ["./hotspot-form.component.scss"],
})
export class HotspotFormComponent implements OnInit {
  // io
  @Input() text: string;
  @Output() editing = new EventEmitter<boolean>();
  @Output() updated = new EventEmitter<string>();
  @Output() deleting = new EventEmitter();
  @Output() moving = new EventEmitter();
  // public properties
  inEditMode: boolean;

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
    this.moving.emit();
    alert("move hotspot not implemented yet goddamm it :(");
  }

  onCancel() {
    this.inEditMode = false;
    this.editing.emit(false);
  }

  onSave() {
    this.text = this.editHotspotText.value;
    this.updated.emit(this.text);
    this.inEditMode = false;
    this.editing.emit(false);
  }

  // private methods
}
