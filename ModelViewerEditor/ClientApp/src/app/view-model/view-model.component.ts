import {
  AfterContentInit,
  AfterViewInit,
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
import {HotspotFormComponent} from "../hotspot-form/hotspot-form.component";

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
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  @ViewChild("drawer") private drawer!: MatDrawer;

  @ViewChild("hotspotForm") private hotspotForm!: HotspotFormComponent;

  notFound = false;
  project: ProjectModel;
  section: SectionModel;
  model: ObjectModel;
  addingHotspot = false;
  movingHotspot = false;
  editingHotspot = false;
  glbVerified = false;
  movingHotspotId = "";
  get modelSource(): string {
    return `${this.baseUrl}models/${this.project.id}/${this.model.id}.glb`;
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const projectId = routeParams.get("projectId");
    const sectionId = routeParams.get("sectionId");
    const modelId = routeParams.get("modelId");
    if (!projectId) {
      this.notFound = true;
    } else {
      this.loadProjectAndSection(projectId, sectionId, modelId);
    }
  }



  selectedHotspot: HotspotModel;

  onNewHotspot_click() {
    this.selectedHotspot = null;
    this.drawer.open();
    this.addingHotspot = true;
  }

  onHotspotSelect(hotspot: HotspotModel) {
    this.selectedHotspot = hotspot;
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
    this.addingHotspot = false;
    this.editingHotspot = false;
    this.selectedHotspot = null;
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
    } else {
      if(this.addingHotspot){
        this.addHotspot(positionAndNormal);
        this.addingHotspot = false;
      }
      else if(this.movingHotspot){
        this.moveHotspot(positionAndNormal.position, positionAndNormal.normal);
        if(this.hotspotForm){
          this.hotspotForm.moveComplete();
        }
      }




    }
  }

  private addHotspot(positionAndNormal: any){
    const newHotspot = this.makeHotspot(
      positionAndNormal.position,
      positionAndNormal.normal
    );
    this.dataService.addHotspot(newHotspot).subscribe((hotspot) => {
      this.model.hotspots.push(hotspot);
      this.selectedHotspot = hotspot;
      this.promptNewHotspotText();
    });

  }

  private moveHotspot(position, normal){
    this.movingHotspotId =  this.selectedHotspot.id;
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
/*            setTimeout(x => {

            }, 500);*/



           /* const a = Object.assign({}, this.selectedHotspot);
            this.selectedHotspot = null;

            this.model.hotspots = this.model.hotspots.filter(
              (x) => x.id !== a.id
            );

            this.model.hotspots.push(a);*/

           /* /!*this.model.hotspots = this.model.hotspots.filter(
              (x) => x.id !== this.selectedHotspot.id
            );

            this.model.hotspots.push(this.selectedHotspot);*!/

            const clonedArray = [];
            this.model.hotspots.forEach(val => clonedArray.push(val));

            this.model.hotspots = clonedArray;*/
          },
          (err) => {
            this.confirmDialogService.showHttpError(err);
          }
        );

  }

  private promptNewHotspotText() {
    const dialogRef = this.dialog.open(NewHotspotDialogComponent, {
      height: "400px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateHotspotText(result);
    });
  }

  private makeHotspot(position, normal) {
    const newHotspot = new NewHotspotModel();
    newHotspot.projectId = this.project.id;
    newHotspot.sectionId = this.section.id;
    newHotspot.modelId = this.model.id;
    newHotspot.text = "New hotspot";
    newHotspot.dataPosition = `${position.x} ${position.y} ${position.z}`;
    newHotspot.dataNormal = `${normal.x} ${normal.y}  ${normal.z}`;
    newHotspot.cameraOrbit = "";
    newHotspot.fieldOfView = "";
    return newHotspot;
  }

  public glbExists = false;

  onFileUpload() {
    this.checkGlbExists();
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

  private loadProjectAndSection(
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
    if (!this.project.id  || !this.model.id) {
      this.glbExists = false;
    }
    this.dataService
      .glbExists(this.project.id,  this.model.id)
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
    this.drawer.open();
  }

  onListSelectHotspot(hs: HotspotModel) {
    this.selectedHotspot = hs;
  }

  onListGotoHotspot($event: HotspotModel) {}

  viewList() {
    this.selectedHotspot = null;
  }
}
