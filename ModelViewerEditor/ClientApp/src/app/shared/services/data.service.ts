import { Injectable } from "@angular/core";
import { ProjectModel } from "../models/project";
import { DataServiceResponse } from "./dataServiceResponse";

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
      return DataService.error("Project name not defined");
    }

    const projects = this.getProjects();
    if (projects.findIndex((x) => x.name == name)) {
      return DataService.error("Name in use");
    }
    const p = new ProjectModel();
    p.name = name;
    this.serverProjects.push(p);
    return DataService.success();
  }

  private static error(msg: string): DataServiceResponse {
    return { success: false, error: msg };
  }

  private static success(): DataServiceResponse {
    return { success: false, error: "" };
  }
}
