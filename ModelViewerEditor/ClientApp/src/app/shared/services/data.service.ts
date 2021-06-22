import { Injectable } from "@angular/core";
import { ProjectModel } from "../models/projectModel";
import { DataServiceResponse } from "./dataServiceResponse";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  private serverProjects: ProjectModel[];

  private static fetchProjects(): ProjectModel[] {
    const p = new ProjectModel();
    p.addedBy = "Forbes";
    p.name = "Test project";
    p.objects = [];
    return [p];
  }

  getProjects(): ProjectModel[] {
    if (!this.serverProjects) {
      this.serverProjects = DataService.fetchProjects();
    }
    return this.serverProjects;
  }

  addProject(name: string, err: string = ""): DataServiceResponse {
    if (!name) {
      return DataService.error("Project name is empty");
    }
    const projects = this.getProjects();
    if (projects.some((x) => x.name.trim().toLowerCase() == name.trim().toLowerCase())) {
      return DataService.error("Name in use");
    }
    const p = new ProjectModel();
    p.name = name;
    this.serverProjects.push(p);
    return DataService.success();
  }

  projectExists(name: string): Observable<boolean>{
    const projects = this.getProjects();
    console.log(projects.some((x) => x.name.trim().toLowerCase() == name.trim().toLowerCase()));
    const result = (projects.some((x) => x.name.trim().toLowerCase() == name.trim().toLowerCase()));
    return of(result);
  }

  private static error(msg: string): DataServiceResponse {
    return { success: false, error: msg };
  }

  private static success(): DataServiceResponse {
    return { success: true, error: "" };
  }
}
