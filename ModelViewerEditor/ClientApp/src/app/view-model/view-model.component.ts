import {
  AfterContentInit,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../shared/services/data.service";
import { first } from "rxjs/operators";
import { ProjectModel } from "../shared/models/projectModel";
import { ObjectModel } from "../shared/models/objectModel";
import { HotspotModel } from "../shared/models/hotspotModel";
import { SectionModel } from "../shared/models/sectionModel";
import { ConfirmDialogService } from "../shared/services/confirm-dialog.service";
import "@google/model-viewer";
import { NewModelDialogComponent } from "../new-model-dialog/new-model-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { NewHotspotModel } from "../shared/models/newHotspotModel";
import { MatDrawer } from "@angular/material/sidenav";
import { AppHeadingService } from "../shared/services/app-heading.service";
import { NewHotspotDialogComponent } from "../new-hotspot-dialog/new-hotspot-dialog.component";
import { HotspotFormComponent } from "../hotspot-form/hotspot-form.component";
import { RenameModelDialogComponent } from "../rename-model-dialog/rename-model-dialog.component";
import { RenameProjectDialogComponent } from "../rename-project-dialog/rename-project-dialog.component";
import { MoveModelDialogComponent } from "../move-model-dialog/move-model-dialog.component";

@Component({
  selector: "app-view-model",
  templateUrl: "./view-model.component.html",
  styleUrls: ["./view-model.component.scss"],
})
export class ViewModelComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private dataService: DataService,
    private confirmDialogService: ConfirmDialogService,
    private dialog: MatDialog,
    private appHeadingService: AppHeadingService,
    private changeDetectorRef: ApplicationRef,
    @Inject("BASE_URL") private baseUrl: string
  ) { }

  /*  @ViewChild("drawer") private drawer!: MatDrawer;*/

  @ViewChild("hotspotForm") private hotspotForm!: HotspotFormComponent;

  projectId: string;
  sectionId: string;
  modelId: string;
  notFound = false;
  project: ProjectModel;
  section: SectionModel;
  model: ObjectModel;
  addingHotspot = false;
  movingHotspot = false;
  editingHotspot = false;
  glbVerified = false;
  movingHotspotId = "";
  selectedHotspot: HotspotModel;
  fileUploaded = false;
  glbExists = false;

  get modelSource(): string {
    return `${this.baseUrl}models/${this.projectId}/${this.modelId}.glb`;
  }



  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.projectId = routeParams.get("projectId");
    this.sectionId = routeParams.get("sectionId");
    this.modelId = routeParams.get("modelId");
    if (!this.projectId) {
      this.notFound = true;
    } else {
      this.loadProjectSectionModel(this.projectId, this.sectionId, this.modelId);
    }
  }




  onNewHotspot_click() {
    this.selectedHotspot = null;
    this.addingHotspot = true;
  }

  onCancelAddHotspot_click() {
    this.addingHotspot = false;
  }

  onHotspotSelect(hotspot: HotspotModel) {
    this.selectedHotspot = hotspot;
    // this.drawer.open();
  }

  closeDrawer() {
    //this.drawer.close();
    this.addingHotspot = false;
    this.editingHotspot = false;
    this.selectedHotspot = null;
  }

  onRenameModel_click() {
    const dialogRef = this.dialog.open(RenameModelDialogComponent,
      {
        height: "400px",
        width: "600px",
        data: { project: this.project, section: this.section, model: this.model },
      });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProjectSectionModel(this.projectId, this.sectionId, this.modelId);
    });
  }

  onMoveModel_click() {
    const dialogRef = this.dialog.open(MoveModelDialogComponent,
      {
        height: "400px",
        width: "600px",
        data: { project: this.project, modelId: this.model.id },
      });

    dialogRef.afterClosed().subscribe((newSectionId: string) => {
      if (newSectionId)
        this._router.navigate(["project", this.project.id, newSectionId]);
    });
  }


  onDelete_click() {
    this.confirmDialogService.confirmDialog(
      "Delete Model",
      "This is irreversible! Are you sure?",
      (result) => {
        if (!result) {
          return;
        }
        this.dataService
          .deleteModel(this.project.id, this.section.id, this.model.id)
          .subscribe(
            () => {
              this._router.navigate([
                "project",
                this.project.id,
                this.section.id,
              ]);
            },
            (err) => {
              this.confirmDialogService.showHttpError(err);
            }
          );
      }
    );
  }




  onModelViewerClick(event: MouseEvent) {
    if (!(this.addingHotspot || this.movingHotspot)) {
      return;
    }

    const viewer = <any>event.target;
    const rect = viewer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const positionAndNormal = viewer.positionAndNormalFromPoint(x, y);
    if (positionAndNormal == null) {
    }
    else {
      if (this.addingHotspot) {
        this.addHotspot(positionAndNormal);
        this.addingHotspot = false;
      }
      else if (this.movingHotspot) {
        this.moveHotspot(positionAndNormal.position, positionAndNormal.normal);
        if (this.hotspotForm) {
          this.hotspotForm.moveComplete();
        }
      }


    }
  }

  private addHotspot(positionAndNormal: any) {

    const dialogRef = this.dialog.open(NewHotspotDialogComponent, {
      height: "400px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((text: string) => {
      if (!text)
        return;

      const newHotspot = this.makeHotspot(
        positionAndNormal.position,
        positionAndNormal.normal,
        text
      );

      this.dataService.addHotspot(newHotspot).subscribe((hotspot) => {
        this.model.hotspots.push(hotspot);
        this.selectedHotspot = hotspot;
      });
    });
  }

  private moveHotspot(position, normal) {
    this.movingHotspotId = this.selectedHotspot.id;
    this.dataService
      .updateHotspotPosition(
        this.project.id,
        this.section.id,
        this.model.id,
        this.selectedHotspot.id,
        `${position.x} ${position.y} ${position.z}`,
        `${normal.x} ${normal.y}  ${normal.z}`
      )
      .subscribe(
        (hs) => {
          this.selectedHotspot.dataPosition = hs.dataPosition;
          this.selectedHotspot.dataNormal = hs.dataNormal;
          this.movingHotspotId = null;
        },
        (err) => {
          this.confirmDialogService.showHttpError(err);
        }
      );

  }



  private makeHotspot(position, normal, text) {
    const newHotspot = new NewHotspotModel();
    newHotspot.projectId = this.project.id;
    newHotspot.sectionId = this.section.id;
    newHotspot.modelId = this.model.id;
    newHotspot.text = text;
    newHotspot.dataPosition = `${position.x} ${position.y} ${position.z}`;
    newHotspot.dataNormal = `${normal.x} ${normal.y}  ${normal.z}`;
    newHotspot.cameraOrbit = "";
    newHotspot.fieldOfView = "";
    return newHotspot;
  }


  onFileUploading() {
    // this.checkGlbExists();
  }

  onFileUploaded() {
    this.fileUploaded = true;
    this.glbExists = true;
    this.glbVerified = true;
    this.changeDetectorRef.tick();
  }

  onHotspotDelete() {
    this.editingHotspot = true;

    this.confirmDialogService.confirmDialog(
      "Delete hotspot",
      "Are you sure?",
      (result) => {
        if (!result) {
          return;
        }
        const hotspotId = this.selectedHotspot.id;

        this.dataService
          .deleteHotspot(
            this.project.id,
            this.section.id,
            this.model.id,
            hotspotId
          )
          .subscribe(
            () => {
              this.editingHotspot = false;
              this.selectedHotspot = null;
              this.model.hotspots = this.model.hotspots.filter(
                (x) => x.id !== hotspotId
              );
            },
            (err) => {
              this.editingHotspot = false;
              this.confirmDialogService.showHttpError(err);
            }
          );
      }
    );
  }

  onHotspotMove(moving: boolean) {
    this.movingHotspot = moving;
  }

  onHotspotDeselect() {
    this.movingHotspot = false;
    this.editingHotspot = false;
    this.selectedHotspot = null;
    console.log("onHotspotDeselect");
  }

  private loadProjectSectionModel(
    projectId: string,
    sectionId: string,
    modelId: string
  ) {
    this.dataService
      .getProject(projectId)
      .pipe(first())
      .subscribe(
        (project) => {

          if (project) {
            this.project = project;
            this.section = project.sections.find((x) => x.id == sectionId);
            this.model = this.section.models.find((x) => x.id == modelId);
            this.checkGlbExists();
          }
          if (!this.project || !this.section) {
            this.notFound = true;
          } else {
            this.appHeadingService.setBreadcrumbs([
              { routerLink: ["/"], text: "Projects" },
              { routerLink: ["/", "project", project.id], text: project.name },
              {
                routerLink: ["/", "project", project.id, this.section.id],
                text: this.section.name,
              },
              { routerLink: [], text: this.model.name },
            ]);
          }
        },
        (error) => {
          this.notFound = true;
          this.glbVerified = true;
        }
      );

  }
  private checkGlbExists() {
    if (!this.project.id || !this.model.id) {
      this.glbExists = false;
    }
    this.dataService
      .glbExists(this.project.id, this.model.id)
      .subscribe((result) => {
        this.glbExists = result;
        this.glbVerified = true;
      });
  }

  private round(n: number, precision: number) {
    var factor = Math.pow(10, precision);
    var tempNumber = n * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

  updateHotspotText(text: string) {
    this.dataService
      .updateHotspotText(
        this.project.id,
        this.section.id,
        this.model.id,
        this.selectedHotspot.id,
        text
      )
      .subscribe(
        (hs) => {
          this.selectedHotspot.text = hs.text;
        },
        (err) => {
          this.confirmDialogService.showHttpError(err);
        }
      );
  }

  onHotspotEdit(editing: boolean) {
    this.editingHotspot = editing;
  }

  onListHotspots_click() {
    //   this.drawer.open();
  }

  onListSelectHotspot(hs: HotspotModel) {
    this.selectedHotspot = hs;
  }

  onListGotoHotspot($event: HotspotModel) { }

  viewList() {
    this.selectedHotspot = null;
  }
}


