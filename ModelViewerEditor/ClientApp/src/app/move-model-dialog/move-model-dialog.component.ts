import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectModel } from "../shared/models/projectModel";
import { DataService } from "../shared/services/data.service";
import { SectionModel } from "../shared/models/sectionModel";
import { MatSelectionListChange } from "@angular/material/list/selection-list";

@Component({
  selector: 'app-move-model-dialog',
  templateUrl: './move-model-dialog.component.html',
  styleUrls: ['./move-model-dialog.component.scss']
})
export class MoveModelDialogComponent implements OnInit {

  project: ProjectModel;
  currentSectionId = "";
  modelId="";

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { project: ProjectModel, modelId: string },
    private readonly dataService: DataService,
    private readonly dialogRef: MatDialogRef<MoveModelDialogComponent>
  ) { }

  ngOnInit(): void {
    this.project = this.data.project;
    this.modelId = this.data.modelId;
    this.currentSectionId = this.findModel(this.data.modelId);
  }

  onSelectionChange(event: MatSelectionListChange) {
    const newSectionId = event.option.value;
    this.dataService.moveModel(this.project.id, this.currentSectionId, this.modelId, newSectionId).subscribe(
      () => {
        this.dialogRef.close(newSectionId);
      },
      (err) => console.log(err)
    );


  }

  private  findModel(id: string): string {
    let sectionId = "";
    this.project.sections.forEach(
      (section: SectionModel) => {
        if (section.models.findIndex(x => x.id === id) > -1) {
          sectionId = section.id;
        }
      }
    );
    return sectionId;
  }

}
