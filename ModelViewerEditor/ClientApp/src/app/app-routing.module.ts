import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { ViewProjectComponent } from "./view-project/view-project.component";
import { ViewSectionComponent } from "./view-section/view-section.component"; // CLI imports router

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "project/:projectId", component: ViewProjectComponent },
  { path: "project/:projectId/:sectionId", component: ViewSectionComponent },
  { path: "fetch-data", component: FetchDataComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
