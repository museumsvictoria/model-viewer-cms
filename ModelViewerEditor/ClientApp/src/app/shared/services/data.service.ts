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
    const body = `"${name}"`;
    return this.http.post<any>(
      `${this.baseUrl}add-project`,
      body,
      this.httpOptions
    );
  }

  addSection(projectId: string, sectionName: string): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionName) {
      return throwError("Section name is empty");
    }
    const body = { projectId, sectionName };
    return this.http.post<any>(
      `${this.baseUrl}add-section`,
      body,
      this.httpOptions
    );
  }

  projectExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}project-exists?name=${name}`);
  }

  addModel(projectId: string, sectionId, modelName: string) {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("sectionId is null");
    }
    if (!modelName) {
      return throwError("Model name is empty");
    }
    const body = { projectId, sectionId, modelName };
    return this.http.post<any>(
      `${this.baseUrl}add-model`,
      body,
      this.httpOptions
    );
  }
}
