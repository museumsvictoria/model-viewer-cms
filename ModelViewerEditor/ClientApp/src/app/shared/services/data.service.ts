import { Injectable } from "@angular/core";
import { ProjectModel } from "../models/projectModel";
import { DataServiceResponse } from "./dataServiceResponse";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";
import { flatMap } from "rxjs/internal/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  private serverProjects: ProjectModel[];

  private static initProjectList(): ProjectModel[] {
    const p = new ProjectModel();
    p.id = "1";
    p.addedBy = "Forbes";
    p.name = "Test project";
    p.objects = [];
    return [p];
  }

  getProjects(): Observable<ProjectModel[]> {
    if (!this.serverProjects) {
      this.serverProjects = DataService.initProjectList();
    }
    return of(this.serverProjects);
  }

  getProject(id: string): Observable<ProjectModel> {
    return this.getProjects().pipe(
      map((x) =>
        x.find((x) => x.id.trim().toLowerCase() == id.trim().toLowerCase())
      )
    );
  }

  addProject(name: string): Observable<any> {
    if (!name) {
      return throwError("Project name is empty");
    }

    return this.projectExists(name).pipe(
      first(),
      switchMap((projectExists) =>
        projectExists
          ? throwError("Name in use")
          : this.saveProjectToServer(name)
      )
    );
  }

  private saveProjectToServer(name: string): Observable<any> {
    const p = new ProjectModel();
    p.name = name;
    p.id = String(this.serverProjects.length + 1);
    this.serverProjects.push(p);
    return EMPTY;
  }

  projectExists(name: string): Observable<boolean> {
    return this.getProjects().pipe(
      map((x) =>
        x.some((x) => x.name.trim().toLowerCase() == name.trim().toLowerCase())
      )
    );
  }
}
