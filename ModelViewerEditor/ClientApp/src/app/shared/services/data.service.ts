import { Inject, Injectable } from "@angular/core";
import { ProjectModel } from "../models/projectModel";
import { DataServiceResponse } from "./dataServiceResponse";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { first, map, switchMap, tap } from "rxjs/operators";
import { flatMap } from "rxjs/internal/operators";
import { ObjectModel } from "../models/objectModel";
import { SectionModel } from "../models/sectionModel";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  // private httpOptions = {
  //   headers: new Headers({ "Content-Type": "application/json" }),
  // };

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
          {
            id: "1",
            name: "object 1",
            fileName: "model.glb",
            hotspots: [
              {
                id: "1",
                text: "This is hotspot 1",
                dataNormal: "",
                dataPosition: "",
                cameraOrbit: "",
                fieldOfView: "",
              },
              {
                id: "2",
                text: "This is hotspot 2",
                dataNormal: "",
                dataPosition: "",
                cameraOrbit: "",
                fieldOfView: "",
              },
            ],
          },
        ],
      },
    ];
    return [p];
  }

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(`${this.baseUrl}get-projects`);
  }

  getProject(id: string): Observable<ProjectModel> {
    if (!id) {
      return throwError("id is empty");
    }
    return this.http.get<ProjectModel>(`${this.baseUrl}get-project?id=${id}`);
  }

  addProject(name: string): Observable<any> {
    if (!name) {
      return throwError("Project name is empty");
    }
    var body = `"${name}"`;

    return this.http.post<any>(
      `${this.baseUrl}add-project`,
      body,
      this.httpOptions
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

  projectExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}project-exists?name=${name}`
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
