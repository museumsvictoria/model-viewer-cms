import { Inject, Injectable } from "@angular/core";
import { ProjectModel } from "../models/projectModel";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HotspotModel } from "../models/hotspotModel";
import { NewHotspotModel } from "../models/newHotspotModel";
import { ObjectModel } from "../models/objectModel";

@Injectable({
  providedIn: "root",
})
export class DataService {

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) { }

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

  renameProject(id: string, name: string): Observable<any> {
    if (!id) {
      return throwError("Id is empty");
    }
    if (!name) {
      return throwError("Project name is empty");
    }
    const body = { id, name };
    return this.http.post<any>(
      `${this.baseUrl}rename-project`,
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

  renameSection(projectId: string, sectionId: string, name: string): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("SectionId is null");
    }
    if (!name) {
      return throwError("Name is empty");
    }
    const body = { projectId, sectionId, name };
    return this.http.post<any>(
      `${this.baseUrl}rename-section`,
      body,
      this.httpOptions
    );
  }

  renameModel(projectId: string, sectionId: string, modelId: string, name: string): Observable<any> {
    if (!projectId) {
      return throwError("ProjectId is null");
    }
    if (!sectionId) {
      return throwError("SectionId is null");
    }
    if (!modelId) {
      return throwError("ModelId is null");
    }
    if (!name) {
      return throwError("Name is empty");
    }
    const body = { projectId, sectionId, modelId, name };
    return this.http.post<any>(
      `${this.baseUrl}rename-model`,
      body,
      this.httpOptions
    );
  }

  addModel(projectId: string, sectionId, modelName: string): Observable<ObjectModel> {
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
    return this.http.post<ObjectModel>(
      `${this.baseUrl}add-model`,
      body,
      this.httpOptions
    );
  }

  moveModel(projectId: string,sectionId: string,modelId: string,newSectionId: string): Observable<HotspotModel> {
    if (!projectId) {
      return throwError("projectId is null");
    }
    if (!sectionId) {
      return throwError("sectionId is null");
    }
    if (!modelId) {
      return throwError("modelId is empty");
    }
    if (!newSectionId) {
      return throwError("newSectionId is empty");
    }
    const body = { projectId, sectionId, modelId, newSectionId };
    return this.http.post<HotspotModel>(
      `${this.baseUrl}move-model`,
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

  updateHotspotText(
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
      `${this.baseUrl}update-hotspot-text`,
      body,
      this.httpOptions
    );
  }

  updateHotspotPosition(
    projectId: string,
    sectionId: string,
    modelId: string,
    hotspotId: string,
    position: string,
    normal: string,
    cameraOrbit: string
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
    if (!position) {
      return throwError("position is empty");
    }
    if (!normal) {
      return throwError("normal is empty");
    }
    const body = { projectId, sectionId, modelId, hotspotId, position, normal, cameraOrbit };
    console.log(body);
    return this.http.post<any>(
      `${this.baseUrl}update-hotspot-position`,
      body,
      this.httpOptions
    );
  }

  projectExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}project-exists?name=${name}`);
  }

  uploadThumb(blob: any,
    projectId: string,
    sectionId: string,
    modelId: string) {
    let formData = new FormData();
    formData.append('file', blob, modelId + '.png');
 
   formData.append("projectId", projectId);
    formData.append("sectionId", sectionId);
    formData.append("modelId", modelId);
    console.log("upload-thumb");
    return this.http.post(`${this.baseUrl}upload-thumb`, formData);
  }

  uploadGlb(
    file: File,
    projectId: string,
    sectionId: string,
    modelId: string
  ): Observable<any> {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    formData.append("sectionId", sectionId);
    formData.append("modelId", modelId);

    return this.http.post(`${this.baseUrl}upload-model`, formData);
  }


  glbExists(
    projectId: string,
    modelId: string
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}glb-exists?projectId=${projectId}&modelId=${modelId}`
    );
  }

   getModelJson(
    projectId: string,
    sectionId: string,
    modelId: string
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}get-model-json?projectId=${projectId}&sectionId=${sectionId}&modelId=${modelId}`, {responseType: 'text'}
    );
  }

  

    listPngs(
    projectId: string
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseUrl}list-pngs?projectId=${projectId}`
    );
  }

   modelHasThumbnail(
    projectId: string,
    modelId: string
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}model-has-thumbnail?projectId=${projectId}&modelId=${modelId}`
    );
  }
}
