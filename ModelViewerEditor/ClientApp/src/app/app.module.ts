import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ViewProjectComponent } from "./view-project/view-project.component";
import { MatDialogModule } from "@angular/material/dialog";
import { NewProjectDialogComponent } from "./new-project-dialog/new-project-dialog.component";
import { AppRoutingModule } from "./app-routing.module";
import { ViewSectionComponent } from "./view-section/view-section.component";
import { NewSectionDialogComponent } from "./new-section-dialog/new-section-dialog.component";
import { NewModelDialogComponent } from "./new-model-dialog/new-model-dialog.component";
import { ViewModelComponent } from "./view-model/view-model.component";
import { ListHotspotsComponent } from "./list-hotspots/list-hotspots.component";
import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";
import { NgxFileDropModule } from "ngx-file-drop";
import { FileUploadComponent } from "./shared/file-upload/file-upload.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { InfoCardComponent } from './info-card/info-card.component';
import { HotspotFormComponent } from './hotspot-form/hotspot-form.component';
import { NewHotspotDialogComponent } from './new-hotspot-dialog/new-hotspot-dialog.component';
import { ModelViewerInfoComponent } from './model-viewer-info/model-viewer-info.component';
import { RenameProjectDialogComponent } from './rename-project-dialog/rename-project-dialog.component';
import { RenameSectionDialogComponent } from './rename-section-dialog/rename-section-dialog.component';
import { RenameModelDialogComponent } from './rename-model-dialog/rename-model-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NewProjectDialogComponent,
    ViewProjectComponent,
    ViewSectionComponent,
    NewSectionDialogComponent,
    NewModelDialogComponent,
    ViewModelComponent,
    ListHotspotsComponent,
    ConfirmDialogComponent,
    FileUploadComponent,
    InfoCardComponent,
    HotspotFormComponent,
    NewHotspotDialogComponent,
    ModelViewerInfoComponent,
    RenameProjectDialogComponent,
    RenameSectionDialogComponent,
    RenameModelDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
