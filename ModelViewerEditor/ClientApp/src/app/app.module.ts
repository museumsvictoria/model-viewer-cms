import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ProjectListComponent } from './project-list/project-list.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NewProjectDialogComponent} from "./new-project-dialog/new-project-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NewProjectDialogComponent,
    ProjectListComponent,
    ViewProjectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
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
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'fetch-data', component: FetchDataComponent},
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
