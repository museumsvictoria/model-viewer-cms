import { Injectable } from "@angular/core";
import { ProjectModel, SectionModel } from "../models/projectModel";
import { DataServiceResponse } from "./dataServiceResponse";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";
import { flatMap } from "rxjs/internal/operators";
import { ObjectModel } from "../models/objectModel";

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
    p.sections = [
      {
        id: "1",
        name: "Section 1",
        models: [
          { id: "1", name: "object 1", fileName: "model.glb", hotspots: [] },
        ],
      },
    ];
    return [p];
  }

  getProjects(): Observable<ProjectModel[]> {
    if (!this.serverProjects) {
      this.serverProjects = DataService.initProjectList();
    }
    return of(this.serverProjects);
  }

  getProject(id: string): Observable<ProjectModel> {
    if (!id) {
      return throwError("Id is empty");
    }
    return this.getProjects().pipe(
      map((x) =>
        x.find(
          (x) =>
            x.id != null && x.id.trim().toLowerCase() == id.trim().toLowerCase()
        )
      )
    );
  }

  addProject(name: string): Observable<any> {
    if (!name) {
      return throwError("Project name is empty");
    }
    return this.projectExists(name).pipe(
      switchMap((projectExists) =>
        projectExists
          ? throwError("Name in use")
          : this.saveProjectToServer(name)
      )
    );
  }

  addSection(project: ProjectModel, name: string): Observable<any> {
    if (!project) {
      return throwError("Project is null");
    }
    if (!name) {
      return throwError("Section name is empty");
    }
    const p = new SectionModel();
    p.name = name;
    p.id = String(project.sections.length + 1);
    project.sections.push(p);
    return of(true);
  }

  private saveProjectToServer(name: string): Observable<boolean> {
    const p = new ProjectModel();
    p.name = name;
    p.id = String(this.serverProjects.length + 1);
    this.serverProjects.push(p);
    return of(true);
  }

  projectExists(name: string): Observable<boolean> {
    return this.getProjects().pipe(
      map((x) =>
        x.some((x) => x.name.trim().toLowerCase() == name.trim().toLowerCase())
      )
    );
  }

  addModel(section: SectionModel, name: string) {
    if (!section) {
      return throwError("Section is null");
    }
    if (!name) {
      return throwError("Model name is empty");
    }
    const p = new ObjectModel();
    p.name = name;
    p.id = String(section.models.length + 1);
    section.models.push(p);
    return of(true);
  }
}
