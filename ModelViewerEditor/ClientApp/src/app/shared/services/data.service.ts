import { Inject, Injectable } from "@angular/core";
import { ProjectModel } from "../models/projectModel";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HotspotModel } from "../models/hotspotModel";
import { NewHotspotModel } from "../models/newHotspotModel";

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

  addModel(projectId: string, sectionId, modelName: string) {
    if (!projectId) {
      return throwError("projectId is null");
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

  addHotspot(model: NewHotspotModel): Observable<HotspotModel> {
    if (!model.projectId) {
      return throwError("projectId is null");
    }
    if (!model.sectionId) {
      return throwError("sectionId is null");
    }
    if (!model.modelId) {
      return throwError("modelId is empty");
    }

    return this.http.post<HotspotModel>(
      `${this.baseUrl}add-hotspot`,
      model,
      this.httpOptions
    );
  }

  deleteProject(projectId: string): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }

    return this.http.post<any>(
      `${this.baseUrl}delete-project`,
      '"' + projectId + '"',
      this.httpOptions
    );
  }

  deleteSection(projectId: string, sectionId: string): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("sectionId is empty");
    }
    const body = { projectId, sectionId };
    return this.http.post<any>(
      `${this.baseUrl}delete-section`,
      body,
      this.httpOptions
    );
  }

  deleteModel(
    projectId: string,
    sectionId: string,
    modelId: string
  ): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("sectionId is empty");
    }
    if (!modelId) {
      return throwError("modelId is empty");
    }
    const body = { projectId, sectionId, modelId };
    return this.http.post<any>(
      `${this.baseUrl}delete-model`,
      body,
      this.httpOptions
    );
  }

  deleteHotspot(
    projectId: string,
    sectionId: string,
    modelId: string,
    hotspotId: string
  ): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("sectionId is empty");
    }
    if (!modelId) {
      return throwError("modelId is empty");
    }
    if (!hotspotId) {
      return throwError("hotspotId is empty");
    }
    const body = { projectId, sectionId, modelId, hotspotId };
    return this.http.post<any>(
      `${this.baseUrl}delete-hotspot`,
      body,
      this.httpOptions
    );
  }

  updateHotspot(
    projectId: string,
    sectionId: string,
    modelId: string,
    hotspotId: string,
    text: string
  ): Observable<HotspotModel> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("sectionId is empty");
    }
    if (!modelId) {
      return throwError("modelId is empty");
    }
    if (!hotspotId) {
      return throwError("hotspotId is empty");
    }
    const body = { projectId, sectionId, modelId, hotspotId, text };
    return this.http.post<any>(
      `${this.baseUrl}update-hotspot`,
      body,
      this.httpOptions
    );
  }

  projectExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}project-exists?name=${name}`);
  }

  uploadGlb(
    file: File,
    projectId: string,
    sectionId: string,
    modelId: string
  ): Observable<any> {
    console.log("uploadGlb");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    formData.append("sectionId", sectionId);
    formData.append("modelId", modelId);

    let options = {
      headers: new HttpHeaders({
        "Content-Type": "false",
      }),
    };
    // 'Content-Type': multipart/form-data
    return this.http.post(`${this.baseUrl}upload`, formData);
  }

  glbExists(
    projectId: string,
    sectionId: string,
    modelId: string
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}glb-exists?projectId=${projectId}&sectionId=${sectionId}&modelId=${modelId}`
    );
  }
}
