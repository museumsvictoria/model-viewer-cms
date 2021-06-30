import { Component, Input, OnInit } from "@angular/core";
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from "ngx-file-drop";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.scss"],
})
export class FileUploadComponent implements OnInit {
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {}

  @Input() projectId: string;
  @Input() sectionId: string;
  @Input() modelId: string;

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file

          this._dataService
            .uploadGlb(file, this.projectId, this.sectionId, this.modelId)
            .subscribe((x) => console.log(x));
        });
      } else {
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
