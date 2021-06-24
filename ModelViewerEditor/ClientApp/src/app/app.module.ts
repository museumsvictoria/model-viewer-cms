import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
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
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ListProjectsComponent } from "./list-projects/list-projects.component";
import { ViewProjectComponent } from "./view-project/view-project.component";
import { MatDialogModule } from "@angular/material/dialog";
import { NewProjectDialogComponent } from "./new-project-dialog/new-project-dialog.component";
import { AppRoutingModule } from "./app-routing.module";
import { ListSectionsComponent } from "./list-sections/list-sections.component";
import { ViewSectionComponent } from "./view-section/view-section.component";
import { NewSectionDialogComponent } from "./new-section-dialog/new-section-dialog.component";
import { NewModelDialogComponent } from "./new-model-dialog/new-model-dialog.component";
import { ViewModelComponent } from "./view-model/view-model.component";
import { ListModelsComponent } from './list-models/list-models.component';
import { ListHotspotsComponent } from './list-hotspots/list-hotspots.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NewProjectDialogComponent,
    ListProjectsComponent,
    ViewProjectComponent,
    ListSectionsComponent,
    ViewSectionComponent,
    NewSectionDialogComponent,
    NewModelDialogComponent,
    ViewModelComponent,
    ListModelsComponent,
    ListHotspotsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
